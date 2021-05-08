import { Test, TestingModule } from "@nestjs/testing";
import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { ContactService } from "v1/api/contact/contact.service";

export const service = () => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [ContactService, UserServiceProxyV1Mock.provider],
	}).compile();

	return module.get<ContactService>(ContactService);
};
