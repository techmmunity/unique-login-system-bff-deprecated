import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

export interface CreateConfirmationTokenInput {
	userId?: string;
	contactId?: string;
	type: ConfirmationTokenTypeEnum;
}

export interface CreateConfirmationTokenOutput {
	id: string;
	userId?: string;
	contactId?: string;
	token: string;
	usedAt?: Date;
	createdAt: Date;
}
