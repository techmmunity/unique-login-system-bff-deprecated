import { ChangePasswordFirstPartParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	identifier: yup
		.string()
		.required()
		.strict()
		.min(Limits.user.identifier.min)
		.max(Limits.user.identifier.max),
	language: yup.string().required().strict().oneOf(LanguageValues()),
});

export const validate = async (params: ChangePasswordFirstPartParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
