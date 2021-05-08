import { CreateUserLocalParams } from ".";
import { email, username } from "../fields-validation";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

const schema = yup.object().shape({
	email,
	username,
	password: yup.string().required().strict().password(),
	language: yup.string().required().strict().oneOf(LanguageValues()),
});

export const validate = async (params: CreateUserLocalParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
