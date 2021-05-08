import { ApiProperty } from "@nestjs/swagger";

export class CreateUserLocalOutputSchema {
	@ApiProperty({
		description: "User ID",
		example: "37cf5f8d-9d73-4b30-b445-be28aaeb25e0",
	})
	public userId: string;

	@ApiProperty({
		description: "Contact ID, to verify with confirmation token",
		example: "57c62e97-452e-4357-aef3-32cd169ed035",
	})
	public contactId: string;
}
