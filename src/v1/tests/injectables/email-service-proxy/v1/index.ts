import { provider } from "./provider";

import { service } from "./service";

const serviceMock = service();

export const EmailServiceProxyV1Mock = {
	provider: provider(serviceMock),
	service: serviceMock,
};
