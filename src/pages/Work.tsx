import {
  CompletedProjectsSlider,
  OurWorkGallery,
  Title,
  WorkDisplayCard,
} from "@/components";
import { useProject } from "@/hooks";

const Work = () => {
  /**
   * Page States
   */
  const { getInactiveProjects, getActiveProjects } = useProject();
  /**
   * Completed Projects
   */
  const total_inactive_collected_amount = getInactiveProjects().reduce(
    (prev_value, inactive_project) =>
      prev_value + inactive_project.data().donated_amount,
    0
  );

  /**
   * Ongoing Projects
   */
  const total_active_collected_amount = getActiveProjects().reduce(
    (prev_value, active_project) =>
      prev_value + active_project.data().donated_amount,
    0
  );

  const total_collected =
    total_inactive_collected_amount + total_active_collected_amount;

  /**
   * Just Used 80% to Calculate This, You Can Adjust If Need Be
   */
  const total_distributed = total_collected * 0.8;

  /**
   * NB: The General UI of This Page Can Be Improved.
   *  ==> Let Me Know If Need Be.
   */
  return (
    <section>
      {/* Title */}
      <div className="py-5 relative">
        <Title title="Our Work So Far." title_styles="text-[1.5rem]" />
        <h1 className="text-[5rem] absolute top-[3rem] -left-[0.2rem] rotate-90 font-extrabold text-blue-900/50 z-10 ">
          Work
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* Left Side */}
        <section className="flex flex-col gap-3 border p-3 rounded-[2rem] md:items-center">
          {/* Total Collected */}
          <WorkDisplayCard title="Total Donations" value={total_distributed} />

          {/* Total Distributes */}
          <WorkDisplayCard
            title="Total Distributed"
            value={total_distributed}
          />

          <div className="border border-gray-500 py-2 px-1 rounded-md">
            {/* Total Awaiting Distribution */}
            <WorkDisplayCard
              title="Awaiting"
              value={total_collected - total_distributed}
            />
          </div>
        </section>

        {/* Right Side */}
        <section className="">
          {/* slider */}
          <section className="">
            <CompletedProjectsSlider title="WHAT WE HAVE ACCOMPLISHED." />
          </section>

          {/* Past Events Photos */}
          <section>
            <OurWorkGallery />
          </section>
        </section>
      </div>
    </section>
  );
};

export default Work;
