import { ApiProperty } from "@nestjs/swagger";

import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

export class CreateUserLocalInputSchema {
	@ApiProperty({
		description: "User email",
		example: "foo@bar.com",
		minLength: Limits.user.email.min,
		maxLength: Limits.user.email.max,
	})
	public email: string;

	@ApiProperty({
		description: "User nickname",
		example: "foo_bar",
		minLength: Limits.user.username.min,
		maxLength: Limits.user.username.max,
	})
	public username: string;

	@ApiProperty({
		description: "User strong password",
		example: "$tr0ngP@assw0rd",
		minLength: Limits.user.password.min,
		maxLength: Limits.user.password.max,
	})
	public password: string;

	@ApiProperty({
		description: "User language",
		type: "enum",
		enum: LanguageValues(),
	})
	public language: LanguageEnum;
}
