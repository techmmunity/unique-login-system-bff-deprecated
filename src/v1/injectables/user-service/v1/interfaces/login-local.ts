import { RequestResponse, RequestError } from "./global";

export interface LoginLocalInput {
	identifier: string;
	password: string;
}

export interface LoginLocalOutput {
	id: string;
	pin: string;
}

export type LoginLocalResponse =
	| RequestResponse<LoginLocalOutput>
	| RequestError;
