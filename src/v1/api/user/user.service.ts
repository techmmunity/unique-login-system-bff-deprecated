import { Injectable } from "@nestjs/common";
import { EmailServiceProxyV1 } from "v1/injectables/email-service-proxy/v1/email-service-proxy-v1.decorator";
import { UserServiceProxyV1 } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.decorator";

import { EmailServiceProxyV1Service } from "v1/injectables/email-service-proxy/v1/email-service-proxy-v1.service";
import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import {
	changePasswordFirstPart,
	ChangePasswordFirstPartParams,
} from "./service/change-password/first-part";
import {
	changePasswordLastPart,
	ChangePasswordLastPartParams,
} from "./service/change-password/last-part";
import { createLocal, CreateUserLocalParams } from "./service/create/local";

@Injectable()
export class UserService {
	public constructor(
		@EmailServiceProxyV1()
		private readonly EmailServiceProxyV1Service: EmailServiceProxyV1Service,
		@UserServiceProxyV1()
		private readonly UserServiceProxyV1Service: UserServiceProxyV1Service,
	) {
		//
	}

	public createLocal(params: CreateUserLocalParams) {
		return createLocal(
			{
				EmailServiceProxyV1Service: this.EmailServiceProxyV1Service,
				UserServiceProxyV1Service: this.UserServiceProxyV1Service,
			},
			params,
		);
	}

	public changePasswordFirstPart(params: ChangePasswordFirstPartParams) {
		return changePasswordFirstPart(
			{
				EmailServiceProxyV1Service: this.EmailServiceProxyV1Service,
				UserServiceProxyV1Service: this.UserServiceProxyV1Service,
			},
			params,
		);
	}

	public changePasswordLastPart(params: ChangePasswordLastPartParams) {
		return changePasswordLastPart(
			{
				EmailServiceProxyV1Service: this.EmailServiceProxyV1Service,
				UserServiceProxyV1Service: this.UserServiceProxyV1Service,
			},
			params,
		);
	}
}
