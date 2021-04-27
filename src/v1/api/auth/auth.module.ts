import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { UserServiceProxyModule } from "v1/injectables/user-service-proxy/user-service-proxy.module";

import { AuthController } from "./auth.controller";

@Module({
	imports: [UserServiceProxyModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {
	//
}
