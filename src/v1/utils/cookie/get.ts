import { Request } from "express";

export interface GetParams {
	req: Request;
	type: "AUTH" | "REFRESH";
}

const { AUTH_JWT_COOKIE_NAME, REFRESH_JWT_COOKIE_NAME } = process.env;

export const get = ({ req, type }: GetParams) => {
	if (type === "AUTH") {
		return req.cookies[AUTH_JWT_COOKIE_NAME];
	}

	if (type === "REFRESH") {
		return req.cookies[REFRESH_JWT_COOKIE_NAME];
	}
};
