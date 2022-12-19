import { show_register_or_edit_organization_modal_state } from "@/atoms/ModalAtoms";
import { is_editing_organizationState } from "@/atoms/OrganizationAtom";
import { Button, Title } from "@/components";
import { useUser } from "@/hooks";
import { LocalStorage } from "@/utils";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { decrypt } from "n-krypta";
import { useSetRecoilState } from "recoil";

const OrgProfile = () => {
  /**
   * Component States
   */
  const { user } = useUser();
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const org_info = LocalStorage.getStoreValue("org_info")
    ? decrypt(LocalStorage.getStoreValue("org_info"), ENCRYPTION_SECRET_KEY!)
    : "";

  console.log("org_inf", org_info);
  // console.log(JSON.parse(JSON.stringify(org_info)));

  const setIsEditingOrg = useSetRecoilState(is_editing_organizationState);
  const setShowRegisterOrEditOrganizationModal = useSetRecoilState(
    show_register_or_edit_organization_modal_state
  );

  return (
    <section className="px-10">
      {/* General Info*/}
      <Title title="Your Organization Profile Information." />

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
            <span>Organization</span>
          </div>

          {/* Account Creation Time */}
          <div className="flex flex-col">
            <Title title="Account Created At: " />
            <span>{user?.metadata?.creationTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-white h-[18rem] rounded-[2rem] mt-5 px-3 py-4">
        <Title title="Personal Info" title_styles="underline" />
        <div className="flex flex-col gap-4 mt-2">
          {/* Name */}
          <div className="flex flex-col">
            <Title title="Organization Name: " />
            <span className="capitalize">{org_info?.name}</span>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <Title title="Organization Description: " />
            <span className="capitalize">{org_info?.description}</span>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <Title title="Organization Phone Number: " />
            <span className="capitalize">{org_info?.phonenumber}</span>
          </div>

          {/* Edit Button */}
          <Button
            button_styles="bg-blue-500 px-4 py-2 rounded-full text-white"
            title="Edit Your Organization Info"
            purpose={() => {
              setIsEditingOrg(true);
              setShowRegisterOrEditOrganizationModal(true);
            }}
          />
        </div>
      </section>
    </section>
  );
};

export default OrgProfile;
