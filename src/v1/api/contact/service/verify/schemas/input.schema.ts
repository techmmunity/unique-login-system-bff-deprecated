import { ApiProperty } from "@nestjs/swagger";

export class VerifyContactInputSchema {
	@ApiProperty({
		description: "Contact ID",
		example: "57c62e97-452e-4357-aef3-32cd169ed035",
	})
	public contactId: string;

	@ApiProperty({
		description: "Verification code",
		example: "123456",
	})
	public verificationCode: string;
}
