import { Route, Routes } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants";
import {
  Donor,
  Home,
  Login,
  NotFound,
  Organization,
  About,
  Work,
  Team,
  DonorProfile,
  OrgProfile,
} from "@/pages";
import { CharityDonor, CharityOrganization } from "@/routes";
import { LocalStorage } from "@/utils";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.HOME} element={<Home />} />
      <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
      <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
      <Route path={ROUTE_PATHS.WORK} element={<Work />} />
      <Route path={ROUTE_PATHS.TEAM} element={<Team />} />

      <Route
        path={ROUTE_PATHS.ORGANIZATION}
        element={
          <CharityOrganization>
            <Organization />
          </CharityOrganization>
        }
      />

      <Route
        path={ROUTE_PATHS.ORG_PROFILE}
        element={
          <CharityOrganization>
            <OrgProfile />
          </CharityOrganization>
        }
      />

      <Route
        path={ROUTE_PATHS.DONOR}
        element={
          <CharityDonor>
            <Donor />
          </CharityDonor>
        }
      />

      <Route
        path={ROUTE_PATHS.DONOR_PROFILE}
        element={
          <CharityDonor>
            <DonorProfile />
          </CharityDonor>
        }
      />

      <Route path={ROUTE_PATHS.NOTFOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
