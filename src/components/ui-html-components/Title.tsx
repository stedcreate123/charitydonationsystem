import { FC } from "react";

interface TitleProps {
  title: string;
  title_styles?: string;
}

const Title: FC<TitleProps> = ({ title, title_styles }) => {
  return (
    <h2
      className={`text-sm leading-tight tracking-wider font-semibold text-shadow whitespace-nowrap ${
        title_styles ? title_styles : "text-gray-900 mb-1"
      }`}
    >
      {title}
    </h2>
  );
};

export default Title;
