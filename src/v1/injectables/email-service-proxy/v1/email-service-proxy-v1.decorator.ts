import { Inject } from "@nestjs/common";

import { EMAIL_SERVICE_PROXY_V1_PROVIDER_ID } from "./email-service-proxy-v1.provider";

export const EmailServiceProxyV1 = () => {
	return Inject(EMAIL_SERVICE_PROXY_V1_PROVIDER_ID);
};
