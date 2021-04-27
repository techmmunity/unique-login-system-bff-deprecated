import { Provider } from "@nestjs/common";

import { UserServiceProxyV1Service } from "./user-service-proxy-v1.service";

export const USER_SERVICE_PROXY_V1_PROVIDER_ID = Symbol(
	"USER_SERVICE_PROXY_V1_PROVIDER_ID",
).toString();

export const UserServiceProxyV1Provider: Provider<UserServiceProxyV1Service> = {
	provide: USER_SERVICE_PROXY_V1_PROVIDER_ID,
	useClass: UserServiceProxyV1Service,
	inject: [UserServiceProxyV1Service],
};
