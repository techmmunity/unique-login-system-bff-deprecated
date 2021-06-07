import { CreateUserLocalParams } from ".";
import { email, username } from "../fields-validation";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	email,
	username,
	password: yup
		.string()
		.required()
		.strict()
		.min(Limits.user.password.min)
		.max(Limits.user.password.max)
		.password(),
	language: yup.string().required().strict().oneOf(LanguageValues()),
});

export const validate = async (params: CreateUserLocalParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
