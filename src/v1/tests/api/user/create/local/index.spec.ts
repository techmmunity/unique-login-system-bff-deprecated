import { EmailServiceProxyV1Mock } from "v1/tests/injectables/email-service-proxy/v1";
import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { UserService } from "v1/api/user/user.service";

import { LanguageEnum } from "core/enums/language";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > create > local", () => {
	let service: UserService;

	beforeAll(async () => {
		service = await UserMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with valid params", async () => {
		UserServiceProxyV1Mock.service.createLocal.mockResolvedValue({
			status: 201,
			body: {
				userId: "37cf5f8d-9d73-4b30-b445-be28aaeb25e0",
				contactId: "57c62e97-452e-4357-aef3-32cd169ed035",
				verificationCode: "123456",
			},
		});

		EmailServiceProxyV1Mock.service.sendEmail.mockResolvedValue({
			status: 204,
		});

		let result;

		try {
			result = await service.createLocal({
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(UserServiceProxyV1Mock.service.createLocal).toBeCalledTimes(1);
		expect(EmailServiceProxyV1Mock.service.sendEmail).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId: "37cf5f8d-9d73-4b30-b445-be28aaeb25e0",
			contactId: "57c62e97-452e-4357-aef3-32cd169ed035",
		});
	});
});
