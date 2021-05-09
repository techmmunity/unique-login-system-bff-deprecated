import { Response } from "express";

import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import { CookieUtil } from "v1/utils/cookie";
import { TokenUtil } from "v1/utils/token";

interface Injectables {
	UserServiceProxyV1Service: UserServiceProxyV1Service;
	res: Response;
}

export interface LoginLocalParams {
	identifier: string;
	password: string;
}

export const loginLocal = async (
	{ UserServiceProxyV1Service, res }: Injectables,
	params: LoginLocalParams,
) => {
	const { body } = await UserServiceProxyV1Service.loginLocal(params);

	const authToken = TokenUtil.genAuth(body.userId);
	const refreshToken = TokenUtil.genRefresh(body.userId, body.pin);

	CookieUtil.set({
		res,
		token: authToken,
		type: "AUTH",
	});

	CookieUtil.set({
		res,
		token: refreshToken,
		type: "REFRESH",
	});
};
