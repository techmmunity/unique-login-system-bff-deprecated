import { Module } from "@nestjs/common";

import { Api } from "./api";

@Module({
	imports: [...Api],
})
export class V1Module {
	//
}
