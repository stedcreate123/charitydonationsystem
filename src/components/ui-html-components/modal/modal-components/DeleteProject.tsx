import { show_delete_project_modal_state } from "@/atoms/ModalAtoms";
import { global_project_state } from "@/atoms/ProjectAtom";
import { Delete } from "@/components";
import { db } from "@/firebase";
import { Notification } from "@/utils";
import { deleteDoc, doc } from "firebase/firestore";
import { useRecoilState, useSetRecoilState } from "recoil";

const DeleteProject = () => {
  /**
   * Component States
   */
  const setShowDeleteProjectModal = useSetRecoilState(
    show_delete_project_modal_state
  );
  const [global_project, setGlobalProject] =
    useRecoilState(global_project_state);

  /**
   * Component Functions
   */
  const deleteProject = async () => {
    try {
      const doc_ref = doc(db, "projects", global_project?.id?.toString()!);

      await deleteDoc(doc_ref).then(() => {
        Notification.successNotification("Project Deleted Successfully.");

        setGlobalProject(null);
        setShowDeleteProjectModal(false);
      });
    } catch (error) {
      // Notification.errorNotification(error);
      console.log("Error When Deleting", error);
    }
  };

  return (
    <section>
      <Delete
        name="This Project"
        close={() => {
          setGlobalProject(null);
          setShowDeleteProjectModal(false);
        }}
        delete_item={() => deleteProject()}
      />
    </section>
  );
};

export default DeleteProject;
