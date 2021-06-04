import { ApiProperty } from "@nestjs/swagger";

import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

export class ChangePasswordLastPartInputSchema {
	@ApiProperty({
		description: "Confirmation token ID",
		example: "73638219-0114-41fc-b1d2-48cd1f120774",
		minLength: Limits.user.confirmationTokenId.length,
		maxLength: Limits.user.confirmationTokenId.length,
	})
	public confirmationTokenId: string;

	@ApiProperty({
		description: "User new password",
		example: "$tr0ngP@assw0rd",
		minLength: Limits.user.password.min,
		maxLength: Limits.user.password.max,
	})
	public newPassword: string;

	@ApiProperty({
		description: "User current language",
		type: "enum",
		enum: LanguageValues(),
	})
	public language: LanguageEnum;
}
