import { Response } from "express";
import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { AuthService } from "v1/api/auth/auth.service";

import { AuthMock } from "v1/tests/mocks/auth";

describe("AuthService > verify", () => {
	let service: AuthService;

	const resMock = ({
		cookie: jest.fn(),
	} as unknown) as Response;

	const userId = "37cf5f8d-9d73-4b30-b445-be28aaeb25e0";
	const pin = "123456";
	const username = "foo_bar";
	const email = "foo@bar.com";
	const password = "$tr0ngP@assw0rd";

	beforeAll(async () => {
		service = await AuthMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with valid params (username)", async () => {
		UserServiceProxyV1Mock.service.loginLocal.mockResolvedValue({
			status: 200,
			body: {
				userId,
				pin,
			},
		});

		let result;

		try {
			result = await service.loginLocal(resMock, {
				identifier: username,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(UserServiceProxyV1Mock.service.loginLocal).toBeCalledTimes(1);
		expect(resMock.cookie).toBeCalledTimes(2);
		expect(result).toBeUndefined();
	});

	it("should create user with valid params (email)", async () => {
		UserServiceProxyV1Mock.service.loginLocal.mockResolvedValue({
			status: 200,
			body: {
				userId,
				pin,
			},
		});

		let result;

		try {
			result = await service.loginLocal(resMock, {
				identifier: email,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(UserServiceProxyV1Mock.service.loginLocal).toBeCalledTimes(1);
		expect(resMock.cookie).toBeCalledTimes(2);
		expect(result).toBeUndefined();
	});
});
