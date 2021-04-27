import { Inject } from "@nestjs/common";

import { USER_SERVICE_PROXY_V1_PROVIDER_ID } from "./user-service-proxy-v1.provider";

export const UserServiceProxyV1 = () => {
	return Inject(USER_SERVICE_PROXY_V1_PROVIDER_ID);
};
