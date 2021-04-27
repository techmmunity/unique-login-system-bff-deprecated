import { UserServiceProxyV1MockType } from "./types";

export const service = (): UserServiceProxyV1MockType => {
	const mock = {
		createLocal: jest.fn(),
		loginLocal: jest.fn(),
		addContact: jest.fn(),
		regenPin: jest.fn(),
		verify: jest.fn(),
	};

	const resetMock = () => {
		mock.createLocal.mockClear();
		mock.loginLocal.mockClear();
		mock.addContact.mockClear();
		mock.regenPin.mockClear();
		mock.verify.mockClear();
	};

	return {
		...mock,
		resetMock,
	};
};
