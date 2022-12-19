import {
  show_create_or_edit_project_modal_state,
  show_delete_project_modal_state,
} from "@/atoms/ModalAtoms";
import {
  global_project_state,
  is_editing_project_state,
} from "@/atoms/ProjectAtom";
import { Button } from "@/components";
import { ProjectInfo } from "@/typings.t";
import { FC } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useSetRecoilState } from "recoil";

interface ProjectActionsPros {
  project: ProjectInfo;
}

const ProjectActions: FC<ProjectActionsPros> = ({ project }) => {
  /**
   * Component States
   */

  const setShowDeleteProjectModal = useSetRecoilState(
    show_delete_project_modal_state
  );
  const setGlobalProject = useSetRecoilState(global_project_state);
  const setShowCreateOrEditProjectModal = useSetRecoilState(
    show_create_or_edit_project_modal_state
  );
  const setIsEditingProject = useSetRecoilState(is_editing_project_state);

  return (
    <section className="px-2 flex justify-center flex-col items-center gap-4">
      <Button
        title="Edit Project"
        icon={<FiEdit2 />}
        button_styles="flex w-fit items-center gap-2 px-10 py-2 rounded-[1rem] bg-green-400 text-white whitespace-nowrap text-sm"
        purpose={() => {
          setGlobalProject(project);
          setIsEditingProject(true);
          setShowCreateOrEditProjectModal(true);
        }}
      />

      <Button
        title="Delete Project"
        icon={<FiTrash />}
        button_styles="flex w-fit items-center gap-2 px-10 py-2 rounded-[2rem] whitespace-nowrap bg-red-500 text-white text-sm"
        purpose={() => {
          setShowDeleteProjectModal(true);
          setGlobalProject(project);
        }}
      />
    </section>
  );
};

export default ProjectActions;
