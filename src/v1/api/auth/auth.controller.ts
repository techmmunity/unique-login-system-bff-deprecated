import { Body, Controller, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiNoContentResponse,
	ApiTags,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";

import { CreateUserLocalBadRequestSchema } from "./service/create/local/schemas/bad-request.schema";
import { CreateUserLocalInputSchema } from "./service/create/local/schemas/input.schema";
import { CreateUserLocalOutputSchema } from "./service/create/local/schemas/output.schema";

import { ApiConfig } from "v1/config";

@ApiTags(`${ApiConfig.version} - Auth`)
@Controller(`${ApiConfig.version}/auth`)
export class AuthController {
	public constructor(private readonly AuthService: AuthService) {
		//
	}

	@Post("/create/local")
	@ApiNoContentResponse({
		type: CreateUserLocalOutputSchema,
	})
	@ApiBadRequestResponse({
		type: CreateUserLocalBadRequestSchema,
	})
	public createLocal(@Body() params: CreateUserLocalInputSchema) {
		return this.AuthService.createLocal(params);
	}
}
