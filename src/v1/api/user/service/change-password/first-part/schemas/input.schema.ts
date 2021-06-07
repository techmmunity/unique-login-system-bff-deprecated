import { ApiProperty } from "@nestjs/swagger";

import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

export class ChangePasswordFirstPartInputSchema {
	@ApiProperty({
		description: "User Identifier (username, email, phone number)",
		example: "foo_bar",
		minLength: Limits.user.identifier.min,
		maxLength: Limits.user.identifier.max,
	})
	public identifier: string;

	@ApiProperty({
		description: "User current language",
		type: "enum",
		enum: LanguageValues(),
	})
	public language: LanguageEnum;
}
