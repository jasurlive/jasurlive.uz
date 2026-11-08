interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_FAVICON: string
  readonly VITE_ENABLE_EXTRA_THEMES?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
