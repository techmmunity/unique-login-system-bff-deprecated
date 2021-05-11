import { ChangePasswordLastPartParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

const schema = yup.object().shape({
	confirmationTokenId: yup.string().required().strict(),
	newPassword: yup.string().required().strict(),
	language: yup.string().required().strict().oneOf(LanguageValues()),
});

export const validate = async (params: ChangePasswordLastPartParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
