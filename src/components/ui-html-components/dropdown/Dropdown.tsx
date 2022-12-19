import { FC, ReactNode, useRef } from "react";
import { Icon } from "@/components";
import { SetterOrUpdater } from "recoil";
import { useClickOutside } from "react-haiku";

interface DropdownProps {
  icon: ReactNode;
  dropdown_component: ReactNode;
  display_state: boolean;
  setDisplayState: SetterOrUpdater<boolean>;
}

const Dropdown: FC<DropdownProps> = ({
  icon,
  dropdown_component,
  display_state,
  setDisplayState,
}) => {
  const dropdown_component_ref = useRef<HTMLDivElement>(null);
  useClickOutside(dropdown_component_ref, () => setDisplayState(false));

  return (
    <div className="relative z-50">
      <Icon
        icon={icon}
        iconWrapperStyles={`relative text-gray-900 hover:bg-red-200 p-2 rounded-full hover:text-white text-2xl z-40 ${
          display_state && "bg-red-200"
        }`}
        purpose={() => setDisplayState((prev) => !prev)}
      />

      <div
        ref={dropdown_component_ref}
        className={` ${
          display_state ? "dropdown_content active " : "dropdown_content"
        }`}
      >
        {dropdown_component}
      </div>
    </div>
  );
};

export default Dropdown;
