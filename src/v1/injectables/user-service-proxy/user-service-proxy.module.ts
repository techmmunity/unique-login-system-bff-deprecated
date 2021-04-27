import { Module } from "@nestjs/common";

import { UserServiceProxyV1Provider } from "./v1/user-service-proxy-v1.provider";

import { UserServiceProxyV1Service } from "./v1/user-service-proxy-v1.service";

@Module({
	providers: [UserServiceProxyV1Service, UserServiceProxyV1Provider],
	exports: [UserServiceProxyV1Provider],
})
export class UserServiceProxyModule {
	//
}
