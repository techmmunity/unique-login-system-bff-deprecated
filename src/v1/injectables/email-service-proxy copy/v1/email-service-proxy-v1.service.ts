import { Injectable } from "@nestjs/common";
import fetch, { RequestInit } from "node-fetch";
import { URLSearchParams } from "url";

import { RequestParams, RequestResponse } from "./interfaces/global";
import { SendEmailInput } from "./interfaces/send-email";

import { ErrorUtil } from "v1/utils/error";

import { Urls } from "v1/config/urls";

@Injectable()
export class EmailServiceProxyV1Service {
	public sendEmail(body: SendEmailInput) {
		return this.request<undefined>({
			url: "/email",
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
