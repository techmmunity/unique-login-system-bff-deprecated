import { ChangePasswordFirstPartParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

const schema = yup.object().shape({
	identifier: yup.string().required().strict(),
	language: yup.string().required().strict().oneOf(LanguageValues()),
});

export const validate = async (params: ChangePasswordFirstPartParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
