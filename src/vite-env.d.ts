/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_NODE_ENV: string
  readonly VITE_APP_BASENAME: string
  readonly VITE_APP_API_URL: string

  readonly VITE_APP_DEV_SERVER_PORT: string
}
