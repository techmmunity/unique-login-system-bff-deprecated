import { Injectable } from "@nestjs/common";
import { UserServiceProxyV1 } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.decorator";

import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import { VerifyContactInputSchema } from "./service/verify/schemas/input.schema";

@Injectable()
export class ContactService {
	public constructor(
		@UserServiceProxyV1()
		private readonly UserServiceProxyV1Service: UserServiceProxyV1Service,
	) {
		//
	}

	public async verify(params: VerifyContactInputSchema) {
		await this.UserServiceProxyV1Service.verify(params);
	}
}
