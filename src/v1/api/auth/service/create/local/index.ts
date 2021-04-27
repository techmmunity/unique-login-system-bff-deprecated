import { Response } from "express";

import { validate } from "./validate";

import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import { CookieUtil } from "v1/utils/cookie";
import { TokenUtil } from "v1/utils/token";

export interface CreateUserLocalParams {
	email: string;
	username: string;
	password: string;
}

interface Injectables {
	res: Response;
	UserServiceProxyV1Service: UserServiceProxyV1Service;
}

export const createLocal = async (
	{ UserServiceProxyV1Service, res }: Injectables,
	params: CreateUserLocalParams,
) => {
	await validate(params);

	const result = await UserServiceProxyV1Service.createLocal(params);

	const { id: userId, pin } = result.body;

	const tokenAuth = TokenUtil.genAuth(userId);

	const tokenRefresh = TokenUtil.genRefresh(userId, pin);

	CookieUtil.set({
		res,
		token: tokenAuth,
		type: "AUTH",
	});

	CookieUtil.set({
		res,
		token: tokenRefresh,
		type: "REFRESH",
	});
};
