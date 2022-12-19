import { Button, Line, Icon } from "@/components";
import { TabsData } from "@/typings.t";
import { FC } from "react";

interface TabProps {
  tabs_data: TabsData[];
  tabs_body_styles: string;
  icons_only_tabs?: boolean;
  icons_only_tabs_styles?: string;
  labels_only_tabs_styles?: string;
  tabs_content_height: string;
  index: number;
  setIndex: (index: number) => void;
}

const Tab: FC<TabProps> = ({
  tabs_data,
  tabs_body_styles,
  icons_only_tabs,
  icons_only_tabs_styles,
  labels_only_tabs_styles,
  tabs_content_height,
  index,
  setIndex,
}) => {
  /**
   * Component states
   */
  const { content } = tabs_data[index];

  return (
    <section>
      <section className={`${tabs_body_styles}`}>
        {/* Tab Btns */}
        <section
          className={`duration-300 ${
            icons_only_tabs ? icons_only_tabs_styles : labels_only_tabs_styles
          }`}
        >
          {tabs_data.map(
            (single_tabs_data: TabsData, single_tabs_data_index: number) =>
              icons_only_tabs ? (
                <Icon
                  icon={single_tabs_data.icon}
                  iconWrapperStyles="flex items-center gap-x-2 px-6 py-3  rounded-xl text-c_green uppercase text-sm w-fit"
                  purpose={() => setIndex(single_tabs_data_index)}
                />
              ) : (
                <div className={`duration-300 `} key={single_tabs_data_index}>
                  <Button
                    title={single_tabs_data.label}
                    button_styles={`w-fit duration-300 hover:text-indigo-900 text-base ${
                      single_tabs_data_index === index
                        ? "text-indigo-900 font-semibold tracking-wider"
                        : "text-indigo-500/50"
                    }`}
                    purpose={() => setIndex(single_tabs_data_index)}
                  />

                  <Line
                    line_styles={`duration-300 w-[30px] h-[5px]  rounded-full ${
                      single_tabs_data_index === index
                        ? "bg-red-500"
                        : "w-[5px] h-[5px] bg-red-500/60"
                    }`}
                  />
                </div>
              )
          )}
        </section>

        {/* Tab Info */}
        <section
          className={`col-span-5 overflow-y-scroll duration-300 ${tabs_content_height}  scrollbar-hide  ${
            icons_only_tabs && "lg:-ml-4 xl:-ml-10"
          }`}
        >
          {content}
        </section>
      </section>
    </section>
  );
};

export default Tab;
