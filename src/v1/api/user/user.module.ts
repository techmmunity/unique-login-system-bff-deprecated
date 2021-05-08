import { Module } from "@nestjs/common";

import { UserService } from "./user.service";

import { UserServiceProxyModule } from "v1/injectables/user-service-proxy/user-service-proxy.module";

import { UserController } from "./user.controller";

@Module({
	imports: [UserServiceProxyModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {
	//
}
