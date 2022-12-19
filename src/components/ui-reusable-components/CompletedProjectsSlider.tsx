import { Project, Slider } from "@/components";
import { useProject } from "@/hooks";
import { FC } from "react";

interface CompletedProjectsSliderProps {
  title: string;
}

const CompletedProjectsSlider: FC<CompletedProjectsSliderProps> = ({
  title,
}) => {
  /**
   * Component States
   */
  const { getInactiveProjects } = useProject();

  return (
    <section className="flex justify-center items-center">
      <div className="duration-300 w-full xmd:w-2/3">
        {getInactiveProjects().length > 0 ? (
          getInactiveProjects().length === 1 ? (
            <div>
              <h2 className="text-start text-[0.8rem] font-bold mb-2">
                {title}
              </h2>
              <Project project_data={getInactiveProjects()[0].data()} />
            </div>
          ) : (
            <Slider title={title} data={getInactiveProjects()} />
          )
        ) : (
          <section className="text-lg px-2 text-gray-500 py-4 border border-gray-900 mb-2">
            <span>Completed Projects Will Appear Here.</span>
          </section>
        )}
      </div>
    </section>
  );
};

export default CompletedProjectsSlider;
