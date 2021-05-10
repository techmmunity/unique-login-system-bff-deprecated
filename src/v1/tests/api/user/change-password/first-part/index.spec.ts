import { EmailServiceProxyV1Mock } from "v1/tests/injectables/email-service-proxy/v1";
import { UserServiceProxyV1Mock } from "v1/tests/injectables/user-service-proxy/v1";

import { UserService } from "v1/api/user/user.service";

import { ApplicationEnum } from "core/enums/applications";
import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";
import { LanguageEnum } from "core/enums/language";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > changePassword > firstPart", () => {
	let service: UserService;

	const userId = "37cf5f8d-9d73-4b30-b445-be28aaeb25e0";
	const email = "foo@bar.com";
	const username = "foo_bar";

	beforeAll(async () => {
		service = await UserMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should find user and send email with valid params (email)", async () => {
		UserServiceProxyV1Mock.service.findUser.mockResolvedValue({
			status: 200,
			body: {
				userId,
				username,
				primaryContact: email,
				primaryContactType: ContactTypeEnum.EMAIL,
			},
		});
		UserServiceProxyV1Mock.service.createConfirmationToken.mockResolvedValue({
			status: 201,
			body: {
				userId,
				id: "f25084a9-400b-4f07-8e46-8340217eefb1",
				token: "123456",
				createdAt: new Date(),
			},
		});

		EmailServiceProxyV1Mock.service.sendEmail.mockResolvedValue({
			status: 204,
		});

		let result;

		try {
			result = await service.changePasswordFirstPart({
				identifier: email,
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(UserServiceProxyV1Mock.service.findUser).toBeCalledTimes(1);
		expect(
			UserServiceProxyV1Mock.service.createConfirmationToken,
		).toBeCalledTimes(1);
		expect(EmailServiceProxyV1Mock.service.sendEmail).toBeCalledTimes(1);
		expect(
			UserServiceProxyV1Mock.service.createConfirmationToken,
		).toBeCalledWith({
			userId,
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
		});
		expect(EmailServiceProxyV1Mock.service.sendEmail).toBeCalledWith({
			language: LanguageEnum.EN,
			receiverEmail: email,
			templateCode: "confirm.change.password",
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			extraData: {
				username,
				confirmationTokenId: "f25084a9-400b-4f07-8e46-8340217eefb1",
			},
		});
		expect(result).toBeUndefined();
	});

	it("should throw an error with primary contact being an phone number", async () => {
		UserServiceProxyV1Mock.service.findUser.mockResolvedValue({
			status: 200,
			body: {
				userId,
				username,
				primaryContact: "+5519999904610",
				primaryContactType: ContactTypeEnum.PHONE_NUMBER,
			},
		});

		let result;

		try {
			result = await service.changePasswordFirstPart({
				identifier: email,
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(UserServiceProxyV1Mock.service.findUser).toBeCalledTimes(1);
		expect(EmailServiceProxyV1Mock.service.sendEmail).toBeCalledTimes(0);
		expect(result.status).toBe(418);
		expect(result.response).toStrictEqual({
			errors: [
				"Currently, only reset password with email confirmation is avaliable",
			],
		});
	});
});
