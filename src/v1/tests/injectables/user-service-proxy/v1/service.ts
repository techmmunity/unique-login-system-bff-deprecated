import { UserServiceProxyV1MockType } from "./types";

export const service = (): UserServiceProxyV1MockType => ({
	createLocal: jest.fn(),
	loginLocal: jest.fn(),
	addContact: jest.fn(),
	regenPin: jest.fn(),
	verify: jest.fn(),
});
