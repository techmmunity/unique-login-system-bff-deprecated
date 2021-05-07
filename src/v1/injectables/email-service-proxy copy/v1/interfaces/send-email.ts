import { ApplicationEnum } from "core/enums/applications";
import { LanguageEnum } from "core/enums/language";

export interface SendEmailInput {
	receiverEmail: string;
	templateCode: string;
	application: ApplicationEnum;
	language: LanguageEnum;
	extraData: Record<string, any>;
}
