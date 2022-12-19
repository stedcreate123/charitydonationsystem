import { show_create_or_edit_project_modal_state } from "@/atoms/ModalAtoms";
import {
  ActiveProjects,
  Button,
  InactiveProjects,
  OrganizationReports,
  Tab,
} from "@/components";
import { HiPlusSm } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import { TabsData } from "@/typings.t";
import { useState } from "react";

const Organization = () => {
  /**
   * Component States
   */
  const setShowCreateOrEditProjectModal = useSetRecoilState(
    show_create_or_edit_project_modal_state
  );
  const [index, setIndex] = useState<number>(0);
  const TabData: TabsData[] = [
    {
      label: "Active Projects",
      content: <ActiveProjects />,
    },
    {
      label: "Inactive Projects",
      content: <InactiveProjects />,
    },
    {
      label: "Reports",
      content: <OrganizationReports />,
    },
  ];

  /**
   * Component Functions
   */

  return (
    <section>
      {/* The Create New Project Button */}
      <div className="flex justify-end">
        <Button
          title="Project"
          icon={<HiPlusSm className="text-xl" />}
          button_styles="bg-indigo-900 px-6 py-2 flex items-center gap-4 text-white rounded-full"
          purpose={() => setShowCreateOrEditProjectModal(true)}
        />
      </div>

      {/* The Projects */}
      <Tab
        tabs_data={TabData}
        tabs_body_styles="lg:grid grid-cols-6 duration-300"
        index={index}
        setIndex={setIndex}
        labels_only_tabs_styles="flex flex-row  flex-wrap duration-300 lg:flex-col gap-2 col-span-1"
        tabs_content_height="mt-[1rem] py-2 lg:mt-0 scrollbar-hide h-[34.7rem] lg:h-[38rem]"
      />
    </section>
  );
};

export default Organization;
