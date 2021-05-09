import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { ApiNoContentResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { AuthService } from "./auth.service";

import { LoginLocalInputSchema } from "./service/login/local/schemas/input.schema";

import { ApiConfig } from "v1/config";

@ApiTags(`${ApiConfig.version} - Auth`)
@Controller(`${ApiConfig.version}/auth`)
export class AuthController {
	public constructor(private readonly AuthService: AuthService) {
		//
	}

	@Post("/login/local")
	@HttpCode(204)
	@ApiNoContentResponse({
		headers: {
			"Set-Cookie": {
				description: "Set Auth and Refresh tokens cookies",
			},
		},
	})
	public loginLocal(
		@Res() res: Response,
		@Body() params: LoginLocalInputSchema,
	) {
		return this.AuthService.loginLocal(res, params);
	}
}
