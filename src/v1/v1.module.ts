import { Module } from "@nestjs/common";

import { Api } from "./api";
import { AuthModule } from "./api/auth/auth.module";

@Module({
	imports: [...Api, AuthModule],
})
export class V1Module {
	//
}
