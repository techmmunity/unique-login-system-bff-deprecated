import { yup } from "v1/utils/yup";

import { HeadlineValues } from "core/enums/headline";

export const email = yup.string().required().strict().email();

export const username = yup.string().required().strict().username();

export const birthday = yup.date().required().strict().max(new Date());

export const fullName = yup.string().required().strict().fullName();

export const avatar = yup.string().notRequired().strict().url();

export const headline = yup
	.string()
	.required()
	.strict()
	.oneOf(HeadlineValues());

export const youtube = yup.string().required().strict();
