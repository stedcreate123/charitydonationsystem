import { Project } from "@/components";
import { useProject } from "@/hooks";
import React from "react";

const AllActiveProjects = () => {
  const { getActiveProjects } = useProject();
  return (
    <section className=" flex flex-col gap-2">
      {/* Projects */}
      {getActiveProjects()?.length > 0 ? (
        getActiveProjects()?.map((project, project_index) => (
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

export default AllActiveProjects;
