import { Module } from "@nestjs/common";

import { ContactService } from "./contact.service";

import { UserServiceProxyModule } from "v1/injectables/user-service-proxy/user-service-proxy.module";

import { ContactController } from "./contact.controller";

@Module({
	imports: [UserServiceProxyModule],
	controllers: [ContactController],
	providers: [ContactService],
})
export class ContactModule {
	//
}
