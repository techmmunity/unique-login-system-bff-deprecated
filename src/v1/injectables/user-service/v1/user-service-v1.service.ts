import { Injectable } from "@nestjs/common";
import fetch, { RequestInit } from "node-fetch";
import { URLSearchParams } from "url";

import { AddContactInput, AddContactResponse } from "./interfaces/add-contact";
import {
	CreateLocalInput,
	CreateLocalResponse,
} from "./interfaces/create-local";
import { RequestParams, RequestResponse } from "./interfaces/global";
import { LoginLocalInput, LoginLocalResponse } from "./interfaces/login-local";
import { RegenPinInput, RegenPinResponse } from "./interfaces/regen-pin";
import { VerifyInput, VerifyResponse } from "./interfaces/verify";

import { ErrorUtil } from "v1/utils/error";

@Injectable()
export class UserServiceV1Service {
	private baseUrl = "";
	private apiVersion = "v1";

	public createLocal(body: CreateLocalInput) {
		return this.request<CreateLocalResponse>({
			url: "/user/create/local",
			method: "POST",
			body,
		});
	}

	public loginLocal(body: LoginLocalInput) {
		return this.request<LoginLocalResponse>({
			url: "/user/login/local",
			method: "POST",
			body,
		});
	}

	public regenPin({ userId }: RegenPinInput) {
		return this.request<RegenPinResponse>({
			url: `/user/regen-pin/${userId}`,
			method: "PUT",
		});
	}

	public verify(body: VerifyInput) {
		return this.request<VerifyResponse>({
			url: "/user/verify",
			method: "PUT",
			body,
		});
	}

	public addContact(body: AddContactInput) {
		return this.request<AddContactResponse>({
			url: "/contact",
			method: "POST",
			body,
		});
	}

	private async request<T>({ url, ...params }: RequestParams) {
		return fetch(`${this.baseUrl}${this.apiVersion}${url}`, {
			...params,
			body: new URLSearchParams(params.body),
		} as RequestInit)
			.then(async response => {
				const body = await response.json();

				return {
					status: response.status,
					body,
				} as RequestResponse<T>;
			})
			.catch(err => ErrorUtil.badGateway([err.message]));
	}
}
