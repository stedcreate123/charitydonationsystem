import { atom } from "recoil";
import { LocalStorage } from "@/utils";

/**
 * Atoms Connected To The General App
 */
export const current_user_role_state = atom({
  key: "current_user_role_state",
  default: LocalStorage.getStoreValue("authenticated_user_role"),
});
