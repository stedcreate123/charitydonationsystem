import { LocalStorage } from "@/utils";
import { atom } from "recoil";

/**
 * All Info Connected To MetaMask
 */
export const metamask_error_state = atom({
  key: "metamask_error_state",
  default: "",
});

export const metamask_default_user_account_state = atom({
  key: "metamask_default_user_account_state",
  default: LocalStorage.getStoreValue("metamask_current_user_default_account"),
});

export const metamask_user_balance_state = atom({
  key: "metamask_user_balance_state",
  default: 0,
});

export const is_user_connected_to_metamask_state = atom({
  key: "is_user_connected_to_metamask_state",
  default: false,
});
