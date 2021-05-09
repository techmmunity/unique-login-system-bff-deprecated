import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { UserServiceProxyV1 } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.decorator";

import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import { loginLocal, LoginLocalParams } from "./service/login/local";

@Injectable()
export class AuthService {
	public constructor(
		@UserServiceProxyV1()
		private readonly UserServiceProxyV1Service: UserServiceProxyV1Service,
	) {
		//
	}

	public loginLocal(res: Response, params: LoginLocalParams) {
		return loginLocal(
			{
				UserServiceProxyV1Service: this.UserServiceProxyV1Service,
				res,
			},
			params,
		);
	}
}
