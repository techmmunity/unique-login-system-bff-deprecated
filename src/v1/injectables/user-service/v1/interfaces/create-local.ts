import { RequestError, RequestResponse } from "./global";

export interface CreateLocalInput {
	email: string;
	username: string;
	password: string;
}

export interface CreateLocalOutput {
	id: string;
	pin: string;
}

export type CreateLocalResponse =
	| RequestResponse<CreateLocalOutput>
	| RequestError;
