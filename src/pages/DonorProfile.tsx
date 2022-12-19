import { show_register_or_edit_donor_modal_state } from "@/atoms/ModalAtoms";
import { Button, Title } from "@/components";
import { useUser } from "@/hooks";
import { LocalStorage } from "@/utils";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { decrypt } from "n-krypta";
import { useSetRecoilState } from "recoil";
import { is_editing_donor_state } from "../atoms/DonorAtom";

const DonorProfile = () => {
  /**
   * Component States
   */
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const donor_info = LocalStorage.getStoreValue("donor_info")
    ? decrypt(LocalStorage.getStoreValue("donor_info"), ENCRYPTION_SECRET_KEY!)
    : "";

  const { user } = useUser();
  const setShowRegisterOrEditDonorModal = useSetRecoilState(
    show_register_or_edit_donor_modal_state
  );
  const setIsEditingDonor = useSetRecoilState(is_editing_donor_state);

  return (
    <section className="px-10">
      {/* General Info*/}
      <Title title="Your Profile Information." />
      <section className="bg-white h-[15rem] rounded-[2rem] mt-5 px-3 py-4">
        <Title title="Account Info" title_styles="underline" />
        <div className="flex flex-col gap-4 mt-2">
          {/* Email */}
          <div className="flex flex-col">
            <Title title="Email: " />
            <span>{user?.email}</span>
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <Title title="Account Type: " />
            <span>Donor</span>
          </div>

          {/* Account Creation Time */}
          <div className="flex flex-col">
            <Title title="Account Created At: " />
            <span>{user?.metadata?.creationTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-white h-[15rem] rounded-[2rem] mt-5 px-3 py-4">
        <Title title="Personal Info" title_styles="underline" />
        <div className="flex flex-col gap-4 mt-2">
          {/* Region */}
          <div className="flex flex-col">
            <Title title="Your Region: " />
            <span className="capitalize">{donor_info?.region}</span>
          </div>

          {/* Date Of Birth */}
          <div className="flex flex-col">
            <Title title="Date Of Birth: " />
            <span>
              {donor_info.dateofbirth?.seconds
                ? format(
                    new Timestamp(
                      donor_info.dateofbirth?.seconds,
                      donor_info.dateofbirth?.nanoseconds
                    ).toDate(),
                    "EE, MMM d, yyy"
                  )
                : donor_info.dateofbirth}
            </span>
          </div>

          {/* Edit Button */}
          <Button
            button_styles="bg-blue-500 px-4 py-2 rounded-full text-white"
            title="Edit Personal Info"
            purpose={() => {
              setIsEditingDonor(true);
              setShowRegisterOrEditDonorModal(true);
            }}
          />
        </div>
      </section>
    </section>
  );
};

export default DonorProfile;
