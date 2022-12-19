import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { FC } from "react";

interface InteractiveLinkProps {
  title: string;
  link_styles: string;
  route: string;
  purpose?: () => void;
}

const InteractiveLink: FC<InteractiveLinkProps> = ({
  title,
  link_styles,
  route,
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
    <Link
      className={`${link_styles} flex justify-between py-2 px-4 items-center gap-3`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      to={route}
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
    </Link>
  );
};

export default InteractiveLink;
