import { Provider } from "@nestjs/common";
import { EMAIL_SERVICE_PROXY_V1_PROVIDER_ID } from "v1/injectables/email-service-proxy/v1/email-service-proxy-v1.provider";

import { EmailServiceProxyV1MockType } from "./types";

export const provider = (
	service: EmailServiceProxyV1MockType,
): Provider<EmailServiceProxyV1MockType> => ({
	provide: EMAIL_SERVICE_PROXY_V1_PROVIDER_ID,
	useValue: service,
});
