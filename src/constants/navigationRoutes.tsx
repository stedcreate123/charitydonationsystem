import { Route } from "@/typings.t";
import { CiHome } from "react-icons/ci";

const navigationRoutes: Route[] = [
  {
    icon: <CiHome className="text-2xl" />,
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Work",
    route: "/work",
  },
  {
    title: "Team",
    route: "/team",
  },
];

export default navigationRoutes;
