import { ProjectInfo } from "@/typings.t";
import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";

export const is_editing_project_state = atom({
  key: "is_editing_project_state",
  default: false,
});

export const all_projects_state = atom({
  key: "all_projects_state",
  default: [] as DocumentData[],
});

export const global_project_state = atom({
  key: "global_project_state",
  default: {} as ProjectInfo | null,
});

export const is_deleting_project_state = atom({
  key: "is_deleting_project_state",
  default: false,
});
