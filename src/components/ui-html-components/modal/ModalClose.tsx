import { CgClose } from "react-icons/cg";
import { Icon } from "@/components";
import { FC } from "react";

interface ModalCloseProps {
  close: () => void;
}

const ModalClose: FC<ModalCloseProps> = ({ close }) => {
  return (
    <Icon
      icon={<CgClose className={`w-5 h-5 text-white`} />}
      purpose={close}
      iconWrapperStyles="p-1 w-fit h-fit  rounded-full flex justify-center items-center z-50 bg-red-300 hover:bg-red-500"
    />
  );
};

export default ModalClose;
