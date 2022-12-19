import { Icon, Title } from "@/components";
import { FC } from "react";
import { BsArrowUpRight } from "react-icons/bs";

interface WorkDisplayCardProps {
  title: string;
  value: number;
}

const WorkDisplayCard: FC<WorkDisplayCardProps> = ({ title, value }) => {
  return (
    <section className="grid grid-cols-2 items-center gap-3">
      <Title title={title} title_styles="uppercase" />
      <div className="duration-300 flex items-center gap-2 border w-fit px-[2.5rem] sm:px-[5rem] py-1 bg-gray-900 rounded-md ">
        <span className="text-gray-500 font-black">{value}</span>
        <div className="flex flex-col items-center">
          <Icon
            icon={<BsArrowUpRight className="text-green-500" />}
            iconWrapperStyles=""
          />
          <span className="text-white">ETH</span>
        </div>
      </div>
    </section>
  );
};

export default WorkDisplayCard;
