import * as jwt from "jsonwebtoken";

const { AUTH_JWT_SECRET_KEY } = process.env;

export const genAuth = (userId: string) =>
	jwt.sign(
		{
			id: userId,
		},
		AUTH_JWT_SECRET_KEY,
		{
			expiresIn: "5m",
		},
	);
