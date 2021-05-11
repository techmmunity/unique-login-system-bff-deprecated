import { ApiProperty } from "@nestjs/swagger";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

export class ChangePasswordLastPartBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			InvalidParamsErrorMessage,
			"confirmationTokenId is a required field",
			"confirmationTokenId must be a `string` type, but the final value was: `123`.",
			"newPassword is a required field",
			"newPassword must be a `string` type, but the final value was: `123`.",
			"language is a required field",
			"language must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
