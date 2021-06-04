import { CreateUserLocalParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	email: yup
		.string()
		.required()
		.strict()
		.min(Limits.user.email.min)
		.max(Limits.user.email.max),
	username: yup
		.string()
		.required()
		.strict()
		.min(Limits.user.username.min)
		.max(Limits.user.username.max),
	password: yup
		.string()
		.required()
		.strict()
		.password()
		.min(Limits.user.password.min)
		.max(Limits.user.password.max),
	language: yup.string().required().strict().oneOf(LanguageValues()),
});

export const validate = async (params: CreateUserLocalParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
