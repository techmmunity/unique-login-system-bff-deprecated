import { ApiProperty } from "@nestjs/swagger";

import { LanguageEnum, LanguageValues } from "core/enums/language";

export class CreateUserLocalInputSchema {
	@ApiProperty({
		description: "User email",
		example: "foo@bar.com",
	})
	public email: string;

	@ApiProperty({
		description: "User nickname",
		example: "foo_bar",
	})
	public username: string;

	@ApiProperty({
		description: "User strong password",
		example: "(T6^CKCR",
	})
	public password: string;

	@ApiProperty({
		description: "User language",
		type: "enum",
		enum: LanguageValues(),
	})
	public language: LanguageEnum;
}
