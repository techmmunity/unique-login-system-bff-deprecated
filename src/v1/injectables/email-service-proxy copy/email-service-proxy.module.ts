import { Module } from "@nestjs/common";

import { EmailServiceProxyV1Provider } from "./v1/email-service-proxy-v1.provider";

import { EmailServiceProxyV1Service } from "./v1/email-service-proxy-v1.service";

@Module({
	providers: [EmailServiceProxyV1Service, EmailServiceProxyV1Provider],
	exports: [EmailServiceProxyV1Provider],
})
export class EmailServiceProxyModule {
	//
}
