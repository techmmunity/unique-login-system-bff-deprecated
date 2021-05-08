export interface LoginLocalInput {
	identifier: string;
	password: string;
}

export interface LoginLocalOutput {
	userId: string;
	pin: string;
}
