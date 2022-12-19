import { DonorLogin, OrganizationLogin, Tab } from "@/components";
import { TabsData } from "@/typings.t";
import { useState } from "react";

const Login = () => {
  /**
   * Component States
   */
  const [index, setIndex] = useState<number>(0);
  const TabData: TabsData[] = [
    {
      label: "Donor",
      content: <DonorLogin />,
    },
    {
      label: "Organization",
      content: <OrganizationLogin />,
    },
  ];

  return (
    <section className="px-10">
      <div className="text-2xl mb-3 border px-2 rounded-md py-2 text-blue-900/80">
        Login To CBS As
      </div>
      <Tab
        tabs_data={TabData}
        tabs_body_styles="lg:grid grid-cols-6 duration-300"
        index={index}
        setIndex={setIndex}
        labels_only_tabs_styles="flex flex-row  flex-wrap duration-300 lg:flex-col gap-2 col-span-1"
        tabs_content_height="mt-[1rem] py-2 lg:mt-0 scrollbar-hide h-[30rem]"
      />
    </section>
  );
};

export default Login;
