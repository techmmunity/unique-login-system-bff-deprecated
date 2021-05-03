import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { AuthService } from "v1/api/auth/auth.service";

import { AuthMock } from "v1/tests/mocks/auth";

describe("AuthService > create > local", () => {
	let service: AuthService;

	beforeAll(async () => {
		service = await AuthMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with valid params", async () => {
		UserServiceProxyV1Mock.service.createLocal.mockResolvedValue({
			status: 201,
			body: {
				id: "5fcf0ca3-f15e-4b5e-ba1c-0707d271e2b4",
				pin: "1234",
			},
		});

		const res = {
			cookie: jest.fn(),
		};

		let result;

		try {
			result = await service.createLocal(res as any, {
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
			});
		} catch (e) {
			result = e;
		}

		expect(res.cookie).toBeCalledTimes(2);
		expect(UserServiceProxyV1Mock.service.createLocal).toBeCalledTimes(1);
		expect(result).toBeUndefined();
	});
});
