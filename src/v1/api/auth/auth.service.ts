import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { UserServiceProxyV1 } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.decorator";

import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import { createLocal, CreateUserLocalParams } from "./service/create/local";

@Injectable()
export class AuthService {
	public constructor(
		@UserServiceProxyV1()
		private readonly UserServiceProxyV1Service: UserServiceProxyV1Service,
	) {
		//
	}

	public createLocal(res: Response, params: CreateUserLocalParams) {
		return createLocal(
			{
				UserServiceProxyV1Service: this.UserServiceProxyV1Service,
				res,
			},
			params,
		);
	}
}
