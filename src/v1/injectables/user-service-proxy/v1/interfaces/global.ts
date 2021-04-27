export interface RequestParams extends Omit<RequestInit, "body"> {
	url: string;
	body?: Record<string, any>;
}

export interface RequestResponse<T> {
	status: 200 | 201 | 204;
	body: T;
}

export interface RequestError {
	status: 400 | 403 | 404 | 500 | 502;
	body: {
		errors: Array<any>;
	};
}
