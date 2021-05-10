import { UserServiceProxyV1MockType } from "./types";

export const service = (): UserServiceProxyV1MockType => ({
	createUserLocal: jest.fn(),
	loginLocal: jest.fn(),
	addContact: jest.fn(),
	regenPin: jest.fn(),
	verify: jest.fn(),
	findUser: jest.fn(),
	createConfirmationToken: jest.fn(),
});
