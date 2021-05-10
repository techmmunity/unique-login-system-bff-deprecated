import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordFirstPartTeapotSchema {
	@ApiProperty({
		description: "Errors",
		example: ["Currently, only reset password with email is avaliable"],
	})
	public errors: Array<string>;
}
