import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { Swagger } from "swagger";

import { AppModule } from "./app.module";

const { PORT } = process.env;

async function server() {
	const logger = new Logger("Main");

	const app = await NestFactory.create(AppModule);

	Swagger(app);

	app.use(cookieParser());

	app.listen(PORT, () => logger.log("Server Ready"));
}

server();
