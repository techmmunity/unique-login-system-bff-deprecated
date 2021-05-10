import { Injectable } from "@nestjs/common";
import fetch, { RequestInit } from "node-fetch";
import { URLSearchParams } from "url";

import { AddContactInput, AddContactOutput } from "./interfaces/add-contact";
import {
	CreateConfirmationTokenInput,
	CreateConfirmationTokenOutput,
} from "./interfaces/create-confirmation-token";
import {
	CreateUserLocalInput,
	CreateUserLocalOutput,
} from "./interfaces/create-user-local";
import { FindUserInput, FindUserOutput } from "./interfaces/find-user";
import { RequestParams, RequestResponse } from "./interfaces/global";
import { LoginLocalInput, LoginLocalOutput } from "./interfaces/login-local";
import { RegenPinInput, RegenPinOutput } from "./interfaces/regen-pin";
import { VerifyInput } from "./interfaces/verify";

import { ErrorUtil } from "v1/utils/error";

import { Urls } from "v1/config/urls";

@Injectable()
export class UserServiceProxyV1Service {
	public createUserLocal(body: CreateUserLocalInput) {
		return this.request<CreateUserLocalOutput>({
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

	public findUser({ identifier }: FindUserInput) {
		return this.request<FindUserOutput>({
			url: `/user/${encodeURIComponent(identifier)}`,
			method: "GET",
		});
	}

	public createConfirmationToken(body: CreateConfirmationTokenInput) {
		return this.request<CreateConfirmationTokenOutput>({
			url: "/confirmation-token",
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
