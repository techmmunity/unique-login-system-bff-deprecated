import { CookieOptions, Response } from "express";

export interface SetParams {
	res: Response;
	token: string;
	type: "AUTH" | "REFRESH";
}

const {
	AUTH_JWT_COOKIE_NAME,
	REFRESH_JWT_COOKIE_NAME,
	DOMAIN,
	NODE_ENV,
} = process.env;

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

const FIVE_MINUTES = 5 * 60 * 1000;

const getCookieOptions = (maxAge: number, path: string): CookieOptions => ({
	maxAge,
	path,
	signed: true,
	httpOnly: true,
	sameSite: "strict",
	domain: DOMAIN,
	secure: NODE_ENV === "production",
	expires: new Date(new Date().getTime() + maxAge),
});

export const set = ({ res, token, type }: SetParams) => {
	if (type === "AUTH") {
		res.cookie(
			AUTH_JWT_COOKIE_NAME,
			token,
			getCookieOptions(FIVE_MINUTES, "/"),
		);
	}

	if (type === "REFRESH") {
		res.cookie(
			REFRESH_JWT_COOKIE_NAME,
			token,
			getCookieOptions(ONE_WEEK, "/refresh-token"),
		);
	}
};
