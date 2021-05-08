import { Test, TestingModule } from "@nestjs/testing";
import { EmailServiceProxyV1Mock } from "v1/tests/injectables/email-service-proxy/v1";
import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { UserService } from "v1/api/user/user.service";

export const service = () => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			UserService,
			EmailServiceProxyV1Mock.provider,
			UserServiceProxyV1Mock.provider,
		],
	}).compile();

	return module.get<UserService>(UserService);
};
