import { ChangePasswordLastPartParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	confirmationTokenId: yup
		.string()
		.required()
		.strict()
		.min(Limits.user.confirmationTokenId.length)
		.max(Limits.user.confirmationTokenId.length),
	newPassword: yup
		.string()
		.required()
		.strict()
		.min(Limits.user.password.min)
		.max(Limits.user.password.max),
	language: yup.string().required().strict().oneOf(LanguageValues()),
});

export const validate = async (params: ChangePasswordLastPartParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
