export const appConfig = {
  title: import.meta.env.VITE_APP_TITLE || "Did Sanctions Work? Did Foreign Aid Work? Evidence Lab",
  subtitle:
    import.meta.env.VITE_APP_SUBTITLE ||
    "A classroom investigation of sanctions and foreign aid.",
  boardStorageKey:
    import.meta.env.VITE_BOARD_STORAGE_KEY || "did-it-work-evidence-lab-submissions",
};
