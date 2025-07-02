/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ENV: 'development' | 'test' | 'production';
  readonly VITE_API_BASE_URL: string;
  readonly VITE_UPLOAD_URL: string;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_USE_ENCRYPT: boolean;
  readonly VITE_USE_COMPRESS: boolean;
  readonly VITE_USE_PWA: boolean;
  readonly VITE_USE_ANALYZE: boolean;
  readonly VITE_USE_MOCK: boolean;
  readonly VITE_USE_DEVTOOLS: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
