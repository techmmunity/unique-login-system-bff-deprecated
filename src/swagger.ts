import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export const Swagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle("Unique Login System BFF")
		.setDescription("")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("swagger", app, document);
};
