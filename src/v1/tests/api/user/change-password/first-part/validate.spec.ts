import { ChangePasswordFirstPartParams } from "v1/api/user/service/change-password/first-part";

import { validate } from "v1/api/user/service/change-password/first-part/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

describe("UserService > changePassword > firstPart > validate", () => {
	it("should do nothing with valid params (email)", async () => {
		let result;

		try {
			await validate({
				identifier: "foo@bar.com",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (username)", async () => {
		let result;

		try {
			await validate({
				identifier: "foo_bar",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as ChangePasswordFirstPartParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without identifier", async () => {
		let result;

		try {
			await validate({
				language: LanguageEnum.EN,
			} as ChangePasswordFirstPartParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["identifier is a required field"],
		});
	});

	it("should throw an error with invalid identifier type", async () => {
		let result;

		try {
			await validate({
				identifier: 123 as any,
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"identifier must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid identifier min length", async () => {
		let result;

		try {
			await validate({
				identifier: "".padStart(Limits.user.identifier.min - 1, "A"),
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`identifier must be at least ${Limits.user.identifier.min} characters`,
			],
		});
	});

	it("should throw an error with invalid identifier max length", async () => {
		let result;

		try {
			await validate({
				identifier: "".padStart(Limits.user.identifier.max + 1, "A"),
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`identifier must be at most ${Limits.user.identifier.max} characters`,
			],
		});
	});

	it("should throw an error without language", async () => {
		let result;

		try {
			await validate({
				identifier: "foo@bar.com",
			} as ChangePasswordFirstPartParams);
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
				identifier: "foo@bar.com",
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
				identifier: "foo@bar.com",
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
