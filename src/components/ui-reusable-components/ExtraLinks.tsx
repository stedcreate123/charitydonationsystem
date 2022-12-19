import { Link, useLocation } from "react-router-dom";
import { Button, Dropdown, InteractiveLink, Profile } from "@/components";
import { FC, useState } from "react";
import { useUser } from "@/hooks";
import { show_sidenav_bar_state } from "@/atoms/SideNavBarAtom";
import { Role } from "@/typings.t";
import { AiOutlineUser } from "react-icons/ai";
import { LocalStorage } from "@/utils";
import { useSetRecoilState } from "recoil";
import { decrypt } from "n-krypta";

interface ExtraLinksProps {
  container_styles: string;
}

const ExtraLinks: FC<ExtraLinksProps> = ({ container_styles }) => {
  /**
   * Component States
   */
  const { user } = useUser();
  const setShowSidenavBar = useSetRecoilState(show_sidenav_bar_state);
  const location = useLocation();
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const current_user_role: Role | undefined = LocalStorage.getStoreValue(
    "authenticated_user_role"
  )
    ? decrypt(
        LocalStorage.getStoreValue("authenticated_user_role"),
        ENCRYPTION_SECRET_KEY!
      )
    : undefined;
  const [show_profile_dropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  return (
    <div className={`${container_styles} items-center `}>
      <div className="mt-5 flex flex-col gap-2 lg:flex-row items-center lg:mt-0">
        {user ? (
          // <MetaMask />
          <Dropdown
            icon={<AiOutlineUser />}
            dropdown_component={<Profile />}
            display_state={show_profile_dropdown}
            setDisplayState={setShowProfileDropdown}
          />
        ) : (
          <Link
            to="auth/login"
            onClick={() => setShowSidenavBar(false)}
            className={`flex justify-center items-center h-[2.5rem] lg:w-[9rem]  py-2 text-sm uppercase  w-full  rounded-full  ${
              location.pathname === "/auth/login"
                ? "bg-red-500 text-white"
                : "bg-indigo-400 text-white hover:bg-indigo-300 "
            }`}
          >
            Login
          </Link>
        )}

        {user ? (
          <InteractiveLink
            title={current_user_role === "donor" ? "Donate" : "View Donations"}
            link_styles={`text-sm uppercase  w-full h-[2.5rem] py-1 rounded-md border-gray-900 whitespace-nowrap ${
              location.pathname === "/donor" ||
              location.pathname === "/organization"
                ? "text-gray-900 border border-2 border-dotted"
                : "border"
            }`}
            route={current_user_role === "donor" ? "/donor" : "/organization"}
            purpose={() => setShowSidenavBar(false)}
          />
        ) : (
          <Button
            title="Donate"
            button_styles="text-sm uppercase  w-full h-[2.5rem] py-1 rounded-md  border text-gray-900 cursor-not-allowed"
          />
        )}
      </div>
    </div>
  );
};

export default ExtraLinks;
