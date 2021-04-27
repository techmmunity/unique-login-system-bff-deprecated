export interface CreateLocalInput {
	email: string;
	username: string;
	password: string;
}

export interface CreateLocalOutput {
	id: string;
	pin: string;
}
