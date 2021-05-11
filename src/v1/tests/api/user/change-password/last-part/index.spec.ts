import { EmailServiceProxyV1Mock } from "v1/tests/injectables/email-service-proxy/v1";
import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { UserService } from "v1/api/user/user.service";

import { ApplicationEnum } from "core/enums/applications";
import { ContactTypeEnum } from "core/enums/contact-type";
import { LanguageEnum } from "core/enums/language";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > changePassword > lastPart", () => {
	let service: UserService;

	const userId = "37cf5f8d-9d73-4b30-b445-be28aaeb25e0";
	const confirmationTokenId = "93fc1e9f-601d-4ce0-b374-e2eb9f750092";
	const newPassword = "$tr0ngP@assw0rd";
	const language = LanguageEnum.EN;
	const email = "foo@bar.com";
	const phone = "+5519999904610";
	const username = "foo_bar";

	beforeAll(async () => {
		service = await UserMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should change password and send email with valid params", async () => {
		UserServiceProxyV1Mock.service.changePassword.mockResolvedValue({
			status: 200,
			body: {
				userId,
			},
		});
		UserServiceProxyV1Mock.service.findUser.mockResolvedValue({
			status: 200,
			body: {
				userId,
				username,
				primaryContact: email,
				primaryContactType: ContactTypeEnum.EMAIL,
			},
		});

		EmailServiceProxyV1Mock.service.sendEmail.mockResolvedValue({
			status: 204,
		});

		let result;

		try {
			result = await service.changePasswordLastPart({
				confirmationTokenId,
				newPassword,
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(UserServiceProxyV1Mock.service.changePassword).toBeCalledTimes(1);
		expect(UserServiceProxyV1Mock.service.findUser).toBeCalledTimes(1);
		expect(EmailServiceProxyV1Mock.service.sendEmail).toBeCalledTimes(1);
		expect(EmailServiceProxyV1Mock.service.sendEmail).toBeCalledWith({
			language: LanguageEnum.EN,
			receiverEmail: email,
			templateCode: "password.changed.alert",
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			extraData: {
				userId,
				username,
			},
		});
		expect(result).toBeUndefined();
	});

	it("should change password and NOT send email if primary contact is a phone number", async () => {
		UserServiceProxyV1Mock.service.changePassword.mockResolvedValue({
			status: 200,
			body: {
				userId,
			},
		});
		UserServiceProxyV1Mock.service.findUser.mockResolvedValue({
			status: 200,
			body: {
				userId,
				username,
				primaryContact: phone,
				primaryContactType: ContactTypeEnum.PHONE_NUMBER,
			},
		});

		EmailServiceProxyV1Mock.service.sendEmail.mockResolvedValue({
			status: 204,
		});

		let result;

		try {
			result = await service.changePasswordLastPart({
				confirmationTokenId,
				newPassword,
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(UserServiceProxyV1Mock.service.changePassword).toBeCalledTimes(1);
		expect(UserServiceProxyV1Mock.service.findUser).toBeCalledTimes(1);
		expect(EmailServiceProxyV1Mock.service.sendEmail).toBeCalledTimes(0);
		expect(result).toBeUndefined();
	});
});
