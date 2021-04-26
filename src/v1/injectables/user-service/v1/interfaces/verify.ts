import { RequestError } from "./global";

export interface VerifyInput {
	userId: string;
	verificationCode: string;
}

export type VerifyResponse = undefined | RequestError;
