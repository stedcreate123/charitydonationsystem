import { useProject } from "@/hooks";
import { LocalStorage } from "@/utils";
import { Button, Project } from "@/components";
import { useSetRecoilState } from "recoil";
import { show_create_or_edit_project_modal_state } from "@/atoms/ModalAtoms";

const InactiveProjects = () => {
  /**
   * Component State
   */
  const { getInactiveProjects } = useProject();
  const setShowCreateOrEditProjectModal = useSetRecoilState(
    show_create_or_edit_project_modal_state
  );

  return (
    <section className="h-fit scrollbar-hide  overflow-y-scroll px-1 py-2 flex flex-col gap-2 ">
      {/* Projects */}
      {getInactiveProjects()?.length > 0 ? (
        getInactiveProjects()?.map((project, project_index) => (
          <Project key={project_index} project_data={project.data()} />
        ))
      ) : LocalStorage.getStoreValue("authenticated_user_role") ===
        "organization" ? (
        <div className="border mt-4 flex justify-between py-5 px-2 items-center">
          <h2 className="text-sm px-2 text-gray-500 py-4">
            You Have Not Created Any projects Yet.
          </h2>

          <Button
            title="Create"
            button_styles="bg-gray-900 px-6 text-white w-fit h-fit rounded py-2 px-4"
            purpose={() => setShowCreateOrEditProjectModal(true)}
          />
        </div>
      ) : (
        <section className="border h-[10rem] flex flex-col items-center justify-center gap-4 rounded-[4rem]">
          <span className="text-base font-bold">
            All Inactive Projects Will Appear Here.
          </span>
          <span className="text-sm text-gray-400">
            The Organization Has Not Yet Created Any.
          </span>
        </section>
      )}
    </section>
  );
};

export default InactiveProjects;
