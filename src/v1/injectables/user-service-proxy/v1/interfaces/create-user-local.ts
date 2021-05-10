export interface CreateUserLocalInput {
	email: string;
	username: string;
	password: string;
}

export interface CreateUserLocalOutput {
	userId: string;
	contactId: string;
	username: string;
	email: string;
	verificationCode: string;
}
