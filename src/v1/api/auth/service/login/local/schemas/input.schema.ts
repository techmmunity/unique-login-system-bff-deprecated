import { ApiProperty } from "@nestjs/swagger";

export class LoginLocalInputSchema {
	@ApiProperty({
		description: "User Identifier (username, email, phone number)",
		example: "foo_bar",
	})
	public identifier: string;

	@ApiProperty({
		description: "User password",
		example: "$tr0ngP@assw0rd",
	})
	public password: string;
}
