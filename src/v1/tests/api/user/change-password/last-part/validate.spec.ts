import { ChangePasswordLastPartParams } from "v1/api/user/service/change-password/last-part";

import { validate } from "v1/api/user/service/change-password/last-part/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { LanguageEnum, LanguageValues } from "core/enums/language";
import { Limits } from "v1/config/limits";

describe("UserService > changePassword > lastPart > validate", () => {
	const confirmationTokenId = "93fc1e9f-601d-4ce0-b374-e2eb9f750092";
	const newPassword = "$tr0ngP@assw0rd";
	const language = LanguageEnum.EN;

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword,
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as ChangePasswordLastPartParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without confirmationTokenId", async () => {
		let result;

		try {
			await validate({
				newPassword,
				language,
			} as ChangePasswordLastPartParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["confirmationTokenId is a required field"],
		});
	});

	it("should throw an error with invalid confirmationTokenId type", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId: 123 as any,
				newPassword,
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"confirmationTokenId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid confirmationTokenId min length", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId: "".padStart(
					Limits.user.confirmationTokenId.length - 1,
					"A",
				),
				newPassword,
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`confirmationTokenId must be at least ${Limits.user.identifier.min} characters`,
			],
		});
	});

	it("should throw an error with invalid confirmationTokenId max length", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId: "".padStart(
					Limits.user.confirmationTokenId.length + 1,
					"A",
				),
				newPassword,
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`confirmationTokenId must be at most ${Limits.user.identifier.min} characters`,
			],
		});
	});

	it("should throw an error without newPassword", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				language,
			} as ChangePasswordLastPartParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["newPassword is a required field"],
		});
	});

	it("should throw an error with invalid newPassword type", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword: 123 as any,
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"newPassword must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid newPassword min length", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword: "".padStart(Limits.user.password.min - 1, "A"),
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`identifier must be at least ${Limits.user.password.min} characters`,
			],
		});
	});

	it("should throw an error with invalid newPassword max length", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword: "".padStart(Limits.user.password.max + 1, "A"),
				language,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`identifier must be at most ${Limits.user.password.max} characters`,
			],
		});
	});

	it("should throw an error without language", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword,
			} as ChangePasswordLastPartParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["language is a required field"],
		});
	});

	it("should throw an error with invalid language", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword,
				language: "123" as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`language must be one of the following values: ${LanguageValues().join(
					", ",
				)}`,
			],
		});
	});

	it("should throw an error with invalid language type", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword,
				language: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"language must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
