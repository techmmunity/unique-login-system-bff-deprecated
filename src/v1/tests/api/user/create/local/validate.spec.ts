import { CreateUserLocalParams } from "v1/api/user/service/create/local";

import { validate } from "v1/api/user/service/create/local/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

describe("UserService > create > local > validate", () => {
	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
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
			await validate(("" as unknown) as CreateUserLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without email", async () => {
		let result;

		try {
			await validate({
				username: "example",
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			} as CreateUserLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["email is a required field"],
		});
	});

	it("should throw an error with invalid email", async () => {
		let result;

		try {
			await validate({
				email: "invalid_email",
				username: "example",
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["email must be a valid email"],
		});
	});

	it("should throw an error with invalid email type", async () => {
		let result;

		try {
			await validate({
				email: 123 as any,
				username: "example",
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"email must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid email min length", async () => {
		let result;

		try {
			await validate({
				email: "".padStart(Limits.user.email.min - 1, "A"),
				username: "example",
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [`email must be at least ${Limits.user.email.min} characters`],
		});
	});

	it("should throw an error with invalid email max length", async () => {
		let result;

		try {
			await validate({
				email: "".padStart(Limits.user.email.max + 1, "A"),
				username: "example",
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [`email must be at most ${Limits.user.email.max} characters`],
		});
	});

	it("should throw an error without username", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			} as CreateUserLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["username is a required field"],
		});
	});

	it("should throw an error with invalid username", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "foo@bar.com",
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["username must be a valid username"],
		});
	});

	it("should throw an error with invalid username type", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: 123 as any,
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"username must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid username min length", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "".padStart(Limits.user.username.min - 1, "A"),
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`username must be at least ${Limits.user.username.min} characters`,
			],
		});
	});

	it("should throw an error with invalid username max length", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "".padStart(Limits.user.username.max + 1, "A"),
				password: "p7qV%Ews",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`username must be at most ${Limits.user.username.max} characters`,
			],
		});
	});

	it("should throw an error without password", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "example",
				language: LanguageEnum.EN,
			} as CreateUserLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["password is a required field"],
		});
	});

	it("should throw an error with invalid password", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "example",
				password: "123",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"password must have at least 1 special character, 1 lower case character, 1 upper case character, 1 number and a length between 6 and 24 characters",
			],
		});
	});

	it("should throw an error with invalid password type", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "example",
				password: 123 as any,
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"password must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid password min length", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "example",
				password: "".padStart(Limits.user.password.min - 1, "A"),
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`password must be at least ${Limits.user.password.min} characters`,
			],
		});
	});

	it("should throw an error with invalid password max length", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "example",
				password: "".padStart(Limits.user.password.max + 1, "A"),
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`password must be at most ${Limits.user.password.max} characters`,
			],
		});
	});

	it("should throw an error without language", async () => {
		let result;

		try {
			await validate({
				username: "example",
				email: "foo@bar.com",
				password: "p7qV%Ews",
			} as CreateUserLocalParams);
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
				username: "example",
				email: "foo@bar.com",
				password: "p7qV%Ews",
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
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
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
