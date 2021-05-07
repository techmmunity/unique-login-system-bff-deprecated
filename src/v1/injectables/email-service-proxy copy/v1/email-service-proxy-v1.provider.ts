import { Provider } from "@nestjs/common";

import { EmailServiceProxyV1Service } from "./email-service-proxy-v1.service";

export const EMAIL_SERVICE_PROXY_V1_PROVIDER_ID = Symbol(
	"EMAIL_SERVICE_PROXY_V1_PROVIDER_ID",
).toString();

export const EmailServiceProxyV1Provider: Provider<EmailServiceProxyV1Service> = {
	provide: EMAIL_SERVICE_PROXY_V1_PROVIDER_ID,
	useClass: EmailServiceProxyV1Service,
	inject: [EmailServiceProxyV1Service],
};
