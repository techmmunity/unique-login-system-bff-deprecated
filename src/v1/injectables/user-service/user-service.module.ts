import { Module } from "@nestjs/common";

import { UserServiceV1Service } from "./v1/user-service-v1.service";

@Module({
	exports: [UserServiceV1Service],
})
export class UserServiceModule {
	//
}
