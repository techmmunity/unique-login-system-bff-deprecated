const { USER_SERVICE_HOST } = process.env;

export const Urls = {
	services: {
		user: {
			host: USER_SERVICE_HOST,
			version: "v1",
		},
	},
};
