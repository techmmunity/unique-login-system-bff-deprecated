import { Body, Controller, HttpCode, Post, Response } from "@nestjs/common";
import { ApiBadRequestResponse, ApiNoContentResponse } from "@nestjs/swagger";
import { Response as ExpressResponse } from "express";

import { AuthService } from "./auth.service";

import { CreateUserLocalBadRequestSchema } from "./service/create/local/schemas/bad-request.schema";
import { CreateUserLocalInputSchema } from "./service/create/local/schemas/input.schema";

import { ApiConfig } from "v1/config";

const { AUTH_JWT_COOKIE_NAME, REFRESH_JWT_COOKIE_NAME } = process.env;

@Controller(`${ApiConfig.version}/auth`)
export class AuthController {
	public constructor(private readonly AuthService: AuthService) {
		//
	}

	@HttpCode(204)
	@Post("/create/local")
	@ApiNoContentResponse({
		headers: {
			"Set-Cookie": {
				description: "Auth Token Cookie",
				example: `${AUTH_JWT_COOKIE_NAME}=asdasdasd`,
			},
			"Set-Cookie ": {
				description: "Refresh Token Cookie",
				example: `${REFRESH_JWT_COOKIE_NAME}=asdasdasd`,
			},
		},
	})
	@ApiBadRequestResponse({
		type: CreateUserLocalBadRequestSchema,
	})
	public createLocal(
		@Response() res: ExpressResponse,
		@Body() params: CreateUserLocalInputSchema,
	) {
		return this.AuthService.createLocal(res, params);
	}
}
