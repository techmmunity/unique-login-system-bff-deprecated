import { ContactTypeEnum } from "core/enums/contact-type";

export interface FindUserInput {
	identifier: string;
}

export interface FindUserOutput {
	userId: string;
	username: string;
	primaryContactType: ContactTypeEnum;
	primaryContact: string;
}
