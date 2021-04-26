/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "dev" | "production" | "homolog" | "test";
			PORT: string;
			DOMAIN: string;
			USER_SERVICE_HOST: string;
			AUTH_JWT_SECRET_KEY: string;
			REFRESH_JWT_SECRET_KEY: string;
			AUTH_JWT_COOKIE_NAME: string;
			REFRESH_JWT_COOKIE_NAME: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// eslint-disable-next-line prettier/prettier
export {};
