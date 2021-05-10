import { badGateway } from "./bad-gateway";
import { badRequest } from "./bad-request";
import { conflict } from "./conflict";
import { forbidden } from "./forbidden";
import { internal } from "./internal";
import { notFound } from "./not-found";
import { teapot } from "./teapot";
import { unauthorized } from "./unauthorized";

export const ErrorUtil = {
	badGateway,
	badRequest,
	conflict,
	forbidden,
	internal,
	notFound,
	teapot,
	unauthorized,
};
