import { EmailServiceProxyV1Service } from "v1/injectables/email-service-proxy/v1/email-service-proxy-v1.service";
import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import { validate } from "./validate";

import { ErrorUtil } from "v1/utils/error";

import { ApplicationEnum } from "core/enums/applications";
import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";
import { LanguageEnum } from "core/enums/language";

interface Injectables {
	EmailServiceProxyV1Service: EmailServiceProxyV1Service;
	UserServiceProxyV1Service: UserServiceProxyV1Service;
}

export interface ChangePasswordFirstPartParams {
	identifier: string;
	language: LanguageEnum;
}

export const changePasswordFirstPart = async (
	{ EmailServiceProxyV1Service, UserServiceProxyV1Service }: Injectables,
	params: ChangePasswordFirstPartParams,
) => {
	await validate(params);

	const { identifier, language } = params;

	const user = await UserServiceProxyV1Service.findUser({
		identifier,
	});

	/**
	 * TEMPORARY, until sms messages being implemented
	 */
	if (user.body.primaryContactType !== ContactTypeEnum.EMAIL) {
		return ErrorUtil.teapot([
			"Currently, only reset password with email confirmation is avaliable",
		]);
	}

	const confirmationToken = await UserServiceProxyV1Service.createConfirmationToken(
		{
			userId: user.body.userId,
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
		},
	);

	await EmailServiceProxyV1Service.sendEmail({
		language,
		receiverEmail: user.body.primaryContact,
		templateCode: "confirm.change.password",
		application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
		extraData: {
			username: user.body.username,
			confirmationTokenId: confirmationToken.body.id,
		},
	});
};
