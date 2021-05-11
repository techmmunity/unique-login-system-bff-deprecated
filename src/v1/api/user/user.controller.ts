import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";

import { UserService } from "./user.service";

import { ChangePasswordFirstPartInputSchema } from "./service/change-password/first-part/schemas/input.schema";
import { ChangePasswordFirstPartTeapotSchema } from "./service/change-password/first-part/schemas/teapot.schema";
import { ChangePasswordLastPartBadRequestSchema } from "./service/change-password/last-part/schemas/bad-request.schema";
import { ChangePasswordLastPartInputSchema } from "./service/change-password/last-part/schemas/input.schema";
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
	@ApiCreatedResponse({
		type: CreateUserLocalOutputSchema,
	})
	@ApiBadRequestResponse({
		type: CreateUserLocalBadRequestSchema,
	})
	public createLocal(@Body() params: CreateUserLocalInputSchema) {
		return this.UserService.createLocal(params);
	}

	@Post("/change-password/first-part")
	@HttpCode(204)
	@ApiNoContentResponse()
	@ApiResponse({
		status: 418,
		type: ChangePasswordFirstPartTeapotSchema,
	})
	public changePasswordFirstPart(
		@Body() params: ChangePasswordFirstPartInputSchema,
	) {
		return this.UserService.changePasswordFirstPart(params);
	}

	@Post("/change-password/last-part")
	@HttpCode(204)
	@ApiNoContentResponse()
	@ApiBadRequestResponse({
		type: ChangePasswordLastPartBadRequestSchema,
	})
	public changePasswordLastPart(
		@Body() params: ChangePasswordLastPartInputSchema,
	) {
		return this.UserService.changePasswordLastPart(params);
	}
}
