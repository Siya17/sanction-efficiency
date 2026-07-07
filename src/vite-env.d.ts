/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_SUBTITLE?: string;
  readonly VITE_BOARD_STORAGE_KEY?: string;
  // Optional: enable the shared, real-time class board. If either is missing,
  // the app falls back to a per-browser board stored in localStorage.
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
