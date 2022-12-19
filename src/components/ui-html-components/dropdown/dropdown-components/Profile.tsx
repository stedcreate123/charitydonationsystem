import { show_sidenav_bar_state } from "@/atoms/SideNavBarAtom";
import { Button, Icon, MetaMask, SpinnerLoader } from "@/components";
import { useUser } from "@/hooks";
import { GeneralUtils, LocalStorage } from "@/utils";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { CgProfile } from "react-icons/cg";
import { decrypt } from "n-krypta";

const Profile = () => {
  /**
   * component States
   */
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const role = LocalStorage.getStoreValue("authenticated_user_role")
    ? decrypt(
        LocalStorage.getStoreValue("authenticated_user_role"),
        ENCRYPTION_SECRET_KEY!
      )
    : "";
  const setShowSidenavBar = useSetRecoilState(show_sidenav_bar_state);
  const { user, loading, logoutUser } = useUser();

  return (
    <section className="px-2 divide-y space-y-3">
      <div className="divide-y space-y-3">
        {/* User Info */}
        <div className="flex items-center">
          <img
            src={GeneralUtils.generateAvatar(
              user?.email!,
              "abcab9",
              "2C7A51",
              true
            )}
            alt=""
            className="rounded-full flex-shrink-0 h-10 w-10 "
          />

          <div className="ml-4">
            <div className="text-xs font-semibold text-gray-900">
              {user?.email}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-400">{role}</div>

              <Link to={`${role === "donor" ? "/profile" : "/info"}`}>
                <Icon
                  icon={<CgProfile className="text-[#2C7A51] w-5 h-5" />}
                  iconWrapperStyles=""
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Wallet Info */}
        <div className="py-2">
          <MetaMask />
        </div>
      </div>

      <div className="py-2">
        <Button
          title={
            loading ? <SpinnerLoader color="dark:fill-gray-300" /> : "Log Out"
          }
          button_styles="bg-gray-200 px-4 text-base rounded-full text-gray-900 whitespace-nowrap py-2  w-full"
          purpose={() => {
            logoutUser();
            setShowSidenavBar(false);
          }}
        />
      </div>
    </section>
  );
};

export default Profile;
