import { BrowserRouter } from "react-router-dom";
import {
  Modal,
  RegisterOrEditDonor,
  RegisterOrEditOrganization,
  SideNavBar,
  TopNavBar,
  CreateOrEditProject,
  Donate,
  DeleteProject,
  OrgReports,
  PasswordReset,
} from "@/components";
import AppRoutes from "../src/routes/AppRoutes";
import { useRecoilValue } from "recoil";
import {
  show_register_or_edit_organization_modal_state,
  show_register_or_edit_donor_modal_state,
  show_create_or_edit_project_modal_state,
  show_donate_modal_state,
  show_delete_project_modal_state,
  show_org_reports_state,
  show_password_reset_state,
} from "./atoms/ModalAtoms";
import { Toaster } from "react-hot-toast";
import ReactGa from "react-ga";
import { useEffect } from "react";

const Layout = () => {
  /**
   * Component States
   */
  const show_register_or_edit_organization_modal = useRecoilValue(
    show_register_or_edit_organization_modal_state
  );

  const show_register_or_edit_donor_modal = useRecoilValue(
    show_register_or_edit_donor_modal_state
  );

  const show_create_or_edit_project_modal = useRecoilValue(
    show_create_or_edit_project_modal_state
  );

  const show_donate_modal = useRecoilValue(show_donate_modal_state);

  const show_delete_project_modal = useRecoilValue(
    show_delete_project_modal_state
  );

  const show_org_reports_modal = useRecoilValue(show_org_reports_state);

  const show_password_reset_modal = useRecoilValue(show_password_reset_state);

  useEffect(() => {
    // non interaction
    ReactGa.pageview(window.location.pathname);
  }, []);

  return (
    <BrowserRouter>
      <section className="flex bg-gray-200 relative w-full max-w-[1200px] mx-auto sm:px-[2rem] scroll-smooth">
        <div className="h-screen w-screen">
          <div className=" sm:px-[5rem] h-[4rem] w-full fixed top-0 left-0 flex items-center z-50">
            {/* The Toaster */}
            <Toaster />

            <TopNavBar />
            <SideNavBar />
          </div>

          <div className="mt-[5rem] w-full px-2">
            <AppRoutes />
          </div>
        </div>

        {/* 
          Modals
           => Places In Layout Because Of Styling Bug Faced With The Modal Overlay
         */}
        <Modal
          modal_state={show_register_or_edit_organization_modal}
          modal_styles="w-[90vw] h-[24rem]"
          component={<RegisterOrEditOrganization />}
        />

        <Modal
          modal_state={show_register_or_edit_donor_modal}
          modal_styles="w-[90vw] h-[30rem]"
          component={<RegisterOrEditDonor />}
        />

        <Modal
          modal_state={show_create_or_edit_project_modal}
          modal_styles="w-[92vw] h-[30rem]"
          component={<CreateOrEditProject />}
        />

        <Modal
          modal_state={show_donate_modal}
          modal_styles="w-[92vw] h-[17rem]"
          component={<Donate />}
        />

        <Modal
          modal_state={show_delete_project_modal}
          modal_styles="w-[95vw] h-[14rem]"
          component={<DeleteProject />}
        />

        <Modal
          modal_state={show_org_reports_modal}
          modal_styles="w-[95vw] h-[30rem]"
          component={<OrgReports />}
        />

        <Modal
          modal_state={show_password_reset_modal}
          modal_styles="w-[95vw] h-[15rem]"
          component={<PasswordReset />}
        />
      </section>
    </BrowserRouter>
  );
};

export default Layout;
