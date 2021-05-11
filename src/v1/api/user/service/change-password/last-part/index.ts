import { EmailServiceProxyV1Service } from "v1/injectables/email-service-proxy/v1/email-service-proxy-v1.service";
import { UserServiceProxyV1Service } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.service";

import { ApplicationEnum } from "core/enums/applications";
import { ContactTypeEnum } from "core/enums/contact-type";
import { LanguageEnum } from "core/enums/language";

interface Injectables {
	EmailServiceProxyV1Service: EmailServiceProxyV1Service;
	UserServiceProxyV1Service: UserServiceProxyV1Service;
}

export interface ChangePasswordLastPartParams {
	confirmationTokenId: string;
	newPassword: string;
	language: LanguageEnum;
}

export const changePasswordLastPart = async (
	{ EmailServiceProxyV1Service, UserServiceProxyV1Service }: Injectables,
	params: ChangePasswordLastPartParams,
) => {
	const { body } = await UserServiceProxyV1Service.changePassword(params);

	const { body: user } = await UserServiceProxyV1Service.findUser({
		identifier: body.userId,
	});

	if (user.primaryContactType === ContactTypeEnum.EMAIL) {
		await EmailServiceProxyV1Service.sendEmail({
			receiverEmail: user.primaryContact,
			templateCode: "password.changed.alert",
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			language: params.language,
			extraData: {
				userId: user.userId,
				username: user.username,
			},
		});
	}
};
