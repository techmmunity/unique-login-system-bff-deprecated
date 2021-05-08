import { Body, Controller, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiNoContentResponse,
	ApiTags,
} from "@nestjs/swagger";

import { UserService } from "./user.service";

import { CreateUserLocalBadRequestSchema } from "./service/create/local/schemas/bad-request.schema";
import { CreateUserLocalInputSchema } from "./service/create/local/schemas/input.schema";
import { CreateUserLocalOutputSchema } from "./service/create/local/schemas/output.schema";

import { ApiConfig } from "v1/config";

@ApiTags(`${ApiConfig.version} - User`)
@Controller(`${ApiConfig.version}/user`)
export class UserController {
	public constructor(private readonly UserService: UserService) {
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
		return this.UserService.createLocal(params);
	}
}
