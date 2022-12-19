import {
  ActiveProjects,
  AllActiveProjects,
  History,
  Tab,
  Title,
} from "@/components";
import { useUser } from "@/hooks";
import { TabsData } from "@/typings.t";
import { useState } from "react";

const Donor = () => {
  /**
   * Component States
   */
  const { user } = useUser();
  const [index, setIndex] = useState<number>(0);
  const TabData: TabsData[] = [
    {
      label: "History",
      content: <History />,
    },
    {
      label: "Active Projects",
      content: <AllActiveProjects />,
    },
  ];

  return (
    <section>
      {/* Title */}
      <Title
        title={`Welcome: ` + user?.email}
        title_styles="capitalize border border-indigo-500/50 w-fit px-5 py-2 rounded-[1rem] mb-2  "
      />

      {/* Donor Tabs */}
      <Tab
        tabs_data={TabData}
        tabs_body_styles="lg:grid grid-cols-6 duration-300"
        index={index}
        setIndex={setIndex}
        labels_only_tabs_styles="flex flex-row  flex-wrap duration-300 lg:flex-col gap-2 col-span-1 text-indigo-500"
        tabs_content_height="mt-[1rem] py-2 lg:mt-0 scrollbar-hide h-[34.7rem] lg:h-[38rem]"
      />
    </section>
  );
};

export default Donor;
