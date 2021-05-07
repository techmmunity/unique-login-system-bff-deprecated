import { EmailServiceProxyV1MockType } from "./types";

export const service = (): EmailServiceProxyV1MockType => ({
	sendEmail: jest.fn(),
});
