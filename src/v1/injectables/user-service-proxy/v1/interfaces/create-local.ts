export interface CreateLocalInput {
	email: string;
	username: string;
	password: string;
}

export interface CreateLocalOutput {
	userId: string;
	contactId: string;
	username: string;
	email: string;
	verificationCode: string;
}
