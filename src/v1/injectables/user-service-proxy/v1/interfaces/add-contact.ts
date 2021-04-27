import { ContactTypeEnum } from "core/enums/contact-type";

export interface AddContactInput {
	userId: string;
	contacts: Array<{
		type: ContactTypeEnum;
		value: string;
	}>;
}

export type AddContactOutput = Array<{
	id: string;
	userId: string;
	type: ContactTypeEnum;
	primary: boolean;
	createdAt: Date;
	updatedAt: Date;
}>;
