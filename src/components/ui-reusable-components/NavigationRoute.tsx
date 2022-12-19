import { show_sidenav_bar_state } from "@/atoms/SideNavBarAtom";
import { Route } from "@/typings.t";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

interface NavigationRouteProps {
  route: Route;
}

const NavigationRoute: FC<NavigationRouteProps> = ({ route }) => {
  /**
   * Component States
   */
  const location = useLocation();
  const setShowSidenavBar = useSetRecoilState(show_sidenav_bar_state);

  return (
    <Link
      to={route.route}
      onClick={() => setShowSidenavBar(false)}
      className={` px-4 py-2  text-xs  rounded-xl hover:bg-red-200  hover:font-semibold hover:text-white duration-300 uppercase  font-semibold  cursor-pointer h-fit flex justify-center ${
        location.pathname === route.route
          ? "bg-red-500 text-white "
          : "text-[#0e172c] "
      }`}
    >
      {route.title ? route.title : route.icon}
    </Link>
  );
};

export default NavigationRoute;
