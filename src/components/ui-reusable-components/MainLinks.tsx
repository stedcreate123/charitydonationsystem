import { Route } from "@/typings.t";
import { NavigationRoute } from "@/components";
import { navigationRoutes } from "@/constants";
import { FC } from "react";

interface MainLinksProps {
  container_styles: string;
}

const MainLinks: FC<MainLinksProps> = ({ container_styles }) => {
  return (
    <ul className={`${container_styles}`}>
      {navigationRoutes.map(
        (navigation_route: Route, navigation_route_index: number) => (
          <NavigationRoute
            key={navigation_route_index}
            route={navigation_route}
          />
        )
      )}
    </ul>
  );
};

export default MainLinks;
