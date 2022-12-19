import { FC } from "react";
import { Button, ModalClose } from "@/components";
import { FiTrash } from "react-icons/fi";

interface DeleteProps {
  name: string;
  delete_item: () => void;
  close: () => void;
}

const Delete: FC<DeleteProps> = ({ name, delete_item, close }) => {
  return (
    <section className="px-4">
      <ModalClose close={close} />

      {/* confirmation */}
      <div className="flex justify-center mt-4 text-c_dark">
        <p className="border border-c_gray/20 text-sm w-fit px-3 py-1 rounded-md flex flex-col gap-y-3">
          {`Are you sure you want to delete ${name}?`}

          <span className="font-semibold text-red-500 text-sm">
            Be aware! This action is not reversible.
          </span>
        </p>
      </div>

      {/* the decision control buttons */}
      <div className="mt-10 flex justify-end gap-x-4">
        <Button
          title="Delete"
          icon={<FiTrash className="w-4 h-4" />}
          button_styles="flex gap-x-5 px-5 py-3  rounded-xl text-white uppercase text-sm items-center justify-center  bg-red-500 "
          purpose={delete_item}
        />
      </div>
    </section>
  );
};

export default Delete;
