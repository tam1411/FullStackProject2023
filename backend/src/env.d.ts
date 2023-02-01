/// <reference types="vite/client" />

// Typecheck our Env file! Safety (and verbosity) abound
import {Vitest} from "vitest";

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_IP_ADDR: string;
	readonly VITE_PORT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv
	readonly vitest: Vitest

}
