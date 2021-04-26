import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { RateLimiterGuard, RateLimiterModule } from "nestjs-rate-limit";

import { V1Module } from "v1/v1.module";

@Module({
	imports: [
		RateLimiterModule.forRoot({
			type: "Memory",
		}),
		V1Module,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: RateLimiterGuard,
		},
	],
})
export class AppModule {
	//
}
