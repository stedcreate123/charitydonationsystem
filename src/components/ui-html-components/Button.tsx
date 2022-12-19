import { ReactNode, FC } from "react";

interface ButtonProps {
  title?: string | ReactNode;
  icon?: ReactNode;
  button_icon_wrapper_styles?: string;
  button_styles: string;
  button_title_wrapper_styles?: string;
  purpose?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ref?: any;
}

const Button: FC<ButtonProps> = ({
  icon,
  title,
  button_styles,
  button_title_wrapper_styles,
  button_icon_wrapper_styles,

  purpose,
  type,
  ...rest
}) => {
  return (
    <button onClick={purpose} className={`${button_styles}`} {...rest}>
      <span className={`${button_icon_wrapper_styles}`}>{icon}</span>
      <span className={`${button_title_wrapper_styles}`}>{title}</span>
    </button>
  );
};

export default Button;
