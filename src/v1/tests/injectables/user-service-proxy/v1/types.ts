export interface UserServiceProxyV1MockType {
	createUserLocal: jest.Mock<any, any>;
	loginLocal: jest.Mock<any, any>;
	addContact: jest.Mock<any, any>;
	regenPin: jest.Mock<any, any>;
	verify: jest.Mock<any, any>;
	findUser: jest.Mock<any, any>;
	createConfirmationToken: jest.Mock<any, any>;
}
