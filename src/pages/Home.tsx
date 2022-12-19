import { show_create_or_edit_project_modal_state } from "@/atoms/ModalAtoms";
import { Button, CompletedProjectsSlider, Project, Title } from "@/components";
import { useProject } from "@/hooks";
import { DocumentData } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { LocalStorage } from "@/utils";
import { decrypt } from "n-krypta";
import { Role } from "@/typings.t";

const Home = () => {
  /**
   * Page States
   */
  const { getActiveProjects } = useProject();
  const setShowCreateOrEditProjectModal = useSetRecoilState(
    show_create_or_edit_project_modal_state
  );
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const current_user_role: Role | undefined = LocalStorage.getStoreValue(
    "authenticated_user_role"
  )
    ? decrypt(
        LocalStorage.getStoreValue("authenticated_user_role"),
        ENCRYPTION_SECRET_KEY!
      )
    : undefined;

  return (
    <section className="flex flex-col gap-5 pb-3">
      <div>
        {/* Slider Showing The Completed Projects */}
        <CompletedProjectsSlider title="COMPLETED PROJECTS. Thanks To You" />

        <div className="flex gap-y-2 flex-col lg:mx-10">
          <Title title="ACTIVE PROJECTS YOU CAN DONATE TO." />
          {/* List Of All Active Projects */}
          <section className="px-1 flex flex-col gap-2">
            {getActiveProjects()?.length > 0 ? (
              getActiveProjects()?.map(
                (
                  active_project: DocumentData,
                  active_project_index: number
                ) => (
                  <Project
                    key={active_project_index}
                    project_data={active_project.data()}
                  />
                )
              )
            ) : current_user_role === "organization" ? (
              <div className="border border-gray-900 mt-4 flex justify-between py-5 px-2 items-center">
                <h2 className="text-sm px-2 text-gray-500 py-4">
                  You Have Not Created Any projects Yet.
                </h2>

                <Button
                  title="Create"
                  button_styles="bg-indigo-900  px-6 text-white w-fit h-fit rounded py-2 px-4"
                  purpose={() => setShowCreateOrEditProjectModal(true)}
                />
              </div>
            ) : (
              <section className="border border-gray-900 h-[10rem] flex flex-col items-center justify-center gap-4 rounded-[4rem]">
                <span className="text-base font-bold">
                  All Active Projects Will Appear Here.
                </span>
                <span className="text-sm text-gray-400">
                  The Organization Has Not Yet Created Any.
                </span>
              </section>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Home;
