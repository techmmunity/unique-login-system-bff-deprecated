import { Provider } from "@nestjs/common";
import { USER_SERVICE_PROXY_V1_PROVIDER_ID } from "v1/injectables/user-service-proxy/v1/user-service-proxy-v1.provider";

import { UserServiceProxyV1MockType } from "./types";

export const provider = (
	service: UserServiceProxyV1MockType,
): Provider<UserServiceProxyV1MockType> => ({
	provide: USER_SERVICE_PROXY_V1_PROVIDER_ID,
	useValue: service,
});
