import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { ContactService } from "v1/api/contact/contact.service";

import { ContactMock } from "v1/tests/mocks/contact";

describe("ContactService > verify", () => {
	let service: ContactService;

	const contactId = "57c62e97-452e-4357-aef3-32cd169ed035";
	const verificationCode = "123456";

	beforeAll(async () => {
		service = await ContactMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with valid params", async () => {
		UserServiceProxyV1Mock.service.verify.mockResolvedValue({
			status: 204,
		});

		let result;

		try {
			result = await service.verify({
				contactId,
				verificationCode,
			});
		} catch (e) {
			result = e;
		}

		expect(UserServiceProxyV1Mock.service.verify).toBeCalledTimes(1);
		expect(result).toBeUndefined();
	});
});
