export interface ChangePasswordInput {
	confirmationTokenId: string;
	newPassword: string;
}

export interface ChangePasswordOutput {
	userId: string;
}
