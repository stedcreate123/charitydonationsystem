import { DonationData } from "@/typings.t";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { FC } from "react";
import { Icon } from "@/components";
import { BsThreeDots } from "react-icons/bs";
import { Thanks } from "@/assets";

interface DonationProps {
  donation_data: DonationData;
}

const Donation: FC<DonationProps> = ({ donation_data }) => {
  return (
    <section className="p-2 border rounded-[2rem] flex flex-col">
      <div className="flex justify-between items-center">
        {/* Date */}
        <span className="bg-green-200/50 p-2 rounded-full text-gray-900 font-black text-xs">
          {format(
            new Timestamp(
              donation_data?.timestamp?.seconds,
              donation_data?.timestamp?.nanoseconds
            ).toDate(),
            "EE, MMM d, yyy"
          )}
        </span>

        {/* Action DropDown */}
        <Icon
          icon={<BsThreeDots />}
          iconWrapperStyles="bg-gray-200 rounded-full"
        />
      </div>

      {/* Body */}
      <div className="flex justify-center items-center">
        <div className="my-5 border-2 border-green-500  py-3 w-fit px-2 rounded-tr-[2rem] rounded-bl-[2rem] ">
          <span className="text-lg font-black ">
            {donation_data?.donation_amount} ETH
          </span>
        </div>
      </div>
    </section>
  );
};

export default Donation;
