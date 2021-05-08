import { EmailServiceProxyV1Service } from "v1/injectables/email-service-proxy/v1/email-service-proxy-v1.service";
import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import { validate } from "./validate";

import { ApplicationEnum } from "core/enums/applications";
import { LanguageEnum } from "core/enums/language";

interface Injectables {
	EmailServiceProxyV1Service: EmailServiceProxyV1Service;
	UserServiceProxyV1Service: UserServiceProxyV1Service;
}

export interface CreateUserLocalParams {
	email: string;
	username: string;
	password: string;
	language: LanguageEnum;
}

export const createLocal = async (
	{ EmailServiceProxyV1Service, UserServiceProxyV1Service }: Injectables,
	params: CreateUserLocalParams,
) => {
	await validate(params);

	const result = await UserServiceProxyV1Service.createLocal(params);

	const { userId, contactId, verificationCode } = result.body;

	const { email, username, language } = params;

	await EmailServiceProxyV1Service.sendEmail({
		language,
		receiverEmail: email,
		templateCode: "confirm.contact",
		application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
		extraData: {
			username,
			verificationCode,
		},
	});

	return {
		userId,
		contactId,
	};
};
