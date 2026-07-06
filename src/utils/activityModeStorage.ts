import type { ActivityMode } from "../types";

const STORAGE_KEY = "didItWork.activityMode";

export function getActivityMode(): ActivityMode {
  const mode = window.localStorage.getItem(STORAGE_KEY);
  if (mode === "research") {
    return "research";
  }
  return "classroom";
}

export function saveActivityMode(mode: ActivityMode): void {
  window.localStorage.setItem(STORAGE_KEY, mode);
}
