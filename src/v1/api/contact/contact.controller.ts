import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ContactService } from "./contact.service";

import { VerifyContactInputSchema } from "./service/verify/schemas/input.schema";

import { ApiConfig } from "v1/config";

@ApiTags(`${ApiConfig.version} - Contact`)
@Controller(`${ApiConfig.version}/contact`)
export class ContactController {
	public constructor(private readonly ContactService: ContactService) {
		//
	}

	@Post("/verify")
	@HttpCode(204)
	public verify(@Body() params: VerifyContactInputSchema) {
		return this.ContactService.verify(params);
	}
}
