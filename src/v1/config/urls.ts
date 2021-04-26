const { USER_SERVICE_HOST } = process.env;

export const Urls = {
	services: {
		user: {
			host: `${USER_SERVICE_HOST}/v1`,
			paths: {
				createLocal: "/create-local",
				loginLocal: "/login-local",
			},
		},
	},
};
