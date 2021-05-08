import { Module } from "@nestjs/common";

import { UserService } from "./user.service";

import { EmailServiceProxyModule } from "v1/injectables/email-service-proxy/email-service-proxy.module";
import { UserServiceProxyModule } from "v1/injectables/user-service-proxy/user-service-proxy.module";

import { UserController } from "./user.controller";

@Module({
	imports: [EmailServiceProxyModule, UserServiceProxyModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {
	//
}
