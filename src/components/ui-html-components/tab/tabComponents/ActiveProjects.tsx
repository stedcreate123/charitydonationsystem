import { useProject } from "@/hooks";
import { Project } from "@/components";

const ActiveProjects = () => {
  /**
   * Component States
   */
  const { getOrgActiveProjects } = useProject();

  return (
    <section className=" flex flex-col gap-2">
      {/* Projects */}
      {getOrgActiveProjects()?.length > 0 ? (
        getOrgActiveProjects()?.map((project, project_index) => (
          <Project key={project_index} project_data={project.data()} />
        ))
      ) : (
        <div className="border mt-12 flex justify-center items-center">
          <h2 className="text-lg px-2 text-gray-500 py-4">
            You Have Not Created Any projects Yet.
          </h2>
        </div>
      )}
    </section>
  );
};

export default ActiveProjects;
