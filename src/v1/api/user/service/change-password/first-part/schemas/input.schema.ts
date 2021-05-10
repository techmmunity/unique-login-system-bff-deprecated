import { ApiProperty } from "@nestjs/swagger";

import { LanguageEnum, LanguageValues } from "core/enums/language";

export class ChangePasswordFirstPartInputSchema {
	@ApiProperty({
		description: "User Identifier (username, email, phone number)",
		example: "foo_bar",
	})
	public identifier: string;

	@ApiProperty({
		description: "User current language",
		type: "enum",
		enum: LanguageValues(),
	})
	public language: LanguageEnum;
}
