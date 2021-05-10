import { ImATeapotException } from "@nestjs/common";

export const teapot = (errors: Array<any> = []) => {
	throw new ImATeapotException({ errors });
};
