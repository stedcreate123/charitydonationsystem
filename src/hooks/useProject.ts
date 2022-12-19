import { ProjectInfo } from "@/typings.t";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  orderBy,
  query,
  DocumentData,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useMemo, useState, useEffect } from "react";
import { db, storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { show_create_or_edit_project_modal_state } from "@/atoms/ModalAtoms";

import { useAccount } from "wagmi";
import { Notification } from "@/utils";
import {
  global_project_state,
  is_editing_project_state,
} from "@/atoms/ProjectAtom";
import useUser from "./useUser";

const useProject = () => {
  /**
   * Hook States
   */
  const [is_creating, setIsCreating] = useState<boolean>(false);
  const setIsEditingProject = useSetRecoilState(is_editing_project_state);
  const setShowCreateOrEditProjectModal = useSetRecoilState(
    show_create_or_edit_project_modal_state
  );
  const { address, isConnected } = useAccount();
  const [projects, setProjects] = useState<DocumentData[]>([]);
  const [global_project, setGlobalProject] =
    useRecoilState(global_project_state);
  const { user } = useUser();

  // console.log("global_project", global_project);

  /**
   * Hook Functions
   */
  const createProject = async (project_data: ProjectInfo) => {
    if (isConnected) {
      if (is_creating) return;
      setIsCreating(true);

      const id = new Date().getTime() / 1000;
      await setDoc(doc(db, "projects", id.toString()), {
        id: id,
        title: project_data.title,
        description: project_data.description,
        charity_amount_target: project_data.charity_amount_target,
        dates: project_data.dates,
        amount_unit: project_data?.amount_unit,
        charity_address: address,
        donated_amount: 0,
        status: project_data.status,
        timestamp: serverTimestamp(),
        org_email: user?.email,
      });

      const image_ref = ref(storage, `projects/${id.toString()}/image`);

      if (project_data.image) {
        await uploadString(image_ref, project_data.image, "data_url").then(
          async () => {
            const download_url = await getDownloadURL(image_ref);
            await updateDoc(doc(db, "projects", id.toString()), {
              image: download_url,
            });
          }
        );
      }

      setIsCreating(false);
      setShowCreateOrEditProjectModal(false);
    } else {
      Notification.errorNotification(
        "Please Connected This Account To A Wallet To Use When Collecting The Donations."
      );
      return;
    }
  };

  const editProject = async (
    project_edit_data: ProjectInfo,
    project_id: string
  ) => {
    if (project_edit_data.image.startsWith("https")) {
      await updateDoc(doc(db, "projects", project_id), {
        title: project_edit_data?.title,
        description: project_edit_data?.description,
        dates: project_edit_data?.dates,
        charity_amount_target: project_edit_data?.charity_amount_target,
        charity_address: address,
      }).then(() => {
        Notification.successNotification("Project Edited Successfully.");
        setGlobalProject(null);
        setIsEditingProject(false);
        setShowCreateOrEditProjectModal(false);
      });
    } else {
      const image_ref = ref(storage, `projects/${project_id}/image`);

      deleteObject(image_ref).then(async () => {
        const new_image_ref = ref(storage, `projects/${project_id}/image`);
        await uploadString(
          new_image_ref,
          project_edit_data.image,
          "data_url"
        ).then(async () => {
          const download_url = await getDownloadURL(new_image_ref);
          await updateDoc(doc(db, "projects", project_id), {
            image: download_url,
            title: project_edit_data?.title,
            description: project_edit_data?.description,
            dates: project_edit_data?.dates,
            charity_amount_target: project_edit_data?.charity_amount_target,
            charity_address: address,
          }).then(() => {
            Notification.successNotification("Project Edited Successfully.");
            setGlobalProject(null);
            setIsEditingProject(false);
            setShowCreateOrEditProjectModal(false);
          });
        });
      });
    }

    // if()
  };

  const getInactiveProjects = () => {
    return projects.filter((project) => project.data().status === "inactive");
  };

  const getActiveProjects = () => {
    return projects.filter((project) => project.data().status === "active");
  };

  const getOrgActiveProjects = () => {
    return projects.filter(
      (project) =>
        project.data().org_email === user?.email &&
        project.data().status === "active"
    );
  };

  useEffect(
    // clean
    () =>
      onSnapshot(
        query(collection(db, "projects"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setProjects(snapshot.docs);
        }
      ),
    [db]
  );

  /**
   * Memorizing Specific Values To Prevent Rerenders And Increase Faster Load Time (One Can Also Choose To Ignore This)
   */
  const memoedValue = useMemo(
    () => ({
      createProject,
      getInactiveProjects,
      getActiveProjects,
      getOrgActiveProjects,
      is_creating,
      projects,
      editProject,
    }),
    [is_creating, projects]
  );
  return memoedValue;
};

export default useProject;
