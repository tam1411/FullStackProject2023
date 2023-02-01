/// <reference types="vite/client" />

// Typecheck our Env file! Safety (and verbosity) abound
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_IP_ADDR: string;
	readonly VITE_PORT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
