import { RequestError, RequestResponse } from "./global";

export interface RegenPinInput {
	userId: string;
}

export interface RegenPinOutput {
	newPin: string;
}

export type RegenPinResponse = RequestResponse<RegenPinOutput> | RequestError;
