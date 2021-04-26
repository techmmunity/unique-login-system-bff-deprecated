import * as jwt from "jsonwebtoken";

const { REFRESH_JWT_SECRET_KEY } = process.env;

export const genRefresh = (userId: string, pin: string) =>
	jwt.sign(
		{
			id: userId,
		},
		`${REFRESH_JWT_SECRET_KEY}${pin}`,
		{
			expiresIn: "7d",
		},
	);
