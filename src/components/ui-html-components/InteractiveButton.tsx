import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FC } from "react";

interface InteractiveButtonProps {
  title: string;
  link_styles: string;
  purpose: () => void;
}

const InteractiveButton: FC<InteractiveButtonProps> = ({
  title,
  link_styles,
  purpose,
}) => {
  /**
   * Components States
   */
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  return (
    <button
      className={`${link_styles} flex justify-between py-2 px-4 items-center gap-3`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      onClick={purpose}
    >
      <span>{title}</span>
      {hover ? (
        <div className="ml-[8px] text-xl">
          <IoIosArrowRoundForward />
        </div>
      ) : (
        <div className="ml-[8px] text-xl">
          <MdKeyboardArrowRight />
        </div>
      )}
    </button>
  );
};

export default InteractiveButton;
