export interface UserServiceProxyV1MockType {
	createLocal: jest.Mock<any, any>;
	loginLocal: jest.Mock<any, any>;
	addContact: jest.Mock<any, any>;
	regenPin: jest.Mock<any, any>;
	verify: jest.Mock<any, any>;
	resetMock: () => void;
}
