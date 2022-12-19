import { atom } from "recoil";

export const show_register_or_edit_organization_modal_state = atom({
  key: "show_register_or_edit_organization_modal_state",
  default: false,
});

export const show_register_or_edit_donor_modal_state = atom({
  key: "show_register_or_edit_donor_modal_state",
  default: false,
});

export const show_create_or_edit_project_modal_state = atom({
  key: "show_create_or_edit_project_modal_state",
  default: false,
});

export const show_donate_modal_state = atom({
  key: "show_donate_modal_state",
  default: false,
});

export const show_delete_project_modal_state = atom({
  key: "show_delete_project_modal_state",
  default: false,
});

export const show_org_reports_state = atom({
  key: "show_org_reports_state",
  default: false,
});

export const show_password_reset_state = atom({
  key: "show_password_reset_state",
  default: false,
});
