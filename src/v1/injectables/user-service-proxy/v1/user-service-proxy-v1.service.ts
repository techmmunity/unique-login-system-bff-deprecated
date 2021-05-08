import { Injectable } from "@nestjs/common";
import fetch, { RequestInit } from "node-fetch";
import { URLSearchParams } from "url";

import { AddContactInput, AddContactOutput } from "./interfaces/add-contact";
import { CreateLocalInput, CreateLocalOutput } from "./interfaces/create-local";
import { RequestParams, RequestResponse } from "./interfaces/global";
import { LoginLocalInput, LoginLocalOutput } from "./interfaces/login-local";
import { RegenPinInput, RegenPinOutput } from "./interfaces/regen-pin";
import { VerifyInput } from "./interfaces/verify";

import { ErrorUtil } from "v1/utils/error";

import { Urls } from "v1/config/urls";

@Injectable()
export class UserServiceProxyV1Service {
	public createLocal(body: CreateLocalInput) {
		return this.request<CreateLocalOutput>({
			url: "/user/create/local",
			method: "POST",
			body,
		});
	}

	public loginLocal(body: LoginLocalInput) {
		return this.request<LoginLocalOutput>({
			url: "/user/login/local",
			method: "POST",
			body,
		});
	}

	public regenPin({ userId }: RegenPinInput) {
		return this.request<RegenPinOutput>({
			url: `/user/regen-pin/${userId}`,
			method: "PATCH",
		});
	}

	public verify(body: VerifyInput) {
		return this.request<undefined>({
			url: "/confirmation-token/verify",
			method: "PUT",
			body,
		});
	}

	public addContact(body: AddContactInput) {
		return this.request<AddContactOutput>({
			url: "/contact",
			method: "POST",
			body,
		});
	}

	private async request<T>({ url, ...params }: RequestParams) {
		const basePath = Urls.services.user.host;
		const apiVersion = Urls.services.user.version;

		return fetch(`${basePath}${apiVersion}${url}`, {
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
