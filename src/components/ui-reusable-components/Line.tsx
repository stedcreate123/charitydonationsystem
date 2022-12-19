import { FC } from "react";

interface LineProps {
  line_styles: string;
}

const Line: FC<LineProps> = ({ line_styles }) => {
  return <div className={`${line_styles}`} />;
};

export default Line;
