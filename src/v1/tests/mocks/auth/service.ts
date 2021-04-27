import { Test, TestingModule } from "@nestjs/testing";
import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { AuthService } from "v1/api/auth/auth.service";

export const service = () => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [AuthService, UserServiceProxyV1Mock.provider],
	}).compile();

	return module.get<AuthService>(AuthService);
};
