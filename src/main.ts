import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe, VersioningType} from "@nestjs/common";
import {GenericErrorFilter} from "./common/filters/generic-error.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Config} from "./common/configs/config";
import * as dotenv from "dotenv";
import {UserExtractorInterceptor} from "./common/interceptors/user-extractor.interceptor";

dotenv.config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("restaurant-service/api");
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new GenericErrorFilter()
  );
  app.useGlobalInterceptors(new UserExtractorInterceptor());
  app.enableVersioning({
    defaultVersion: "1",
    type: VersioningType.URI,
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Restaurant Management Service")
    .setDescription("")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("restaurant-service/api/docs", app, document);

  await app.listen(Config.PORT);
  process.on("uncaughtException", function (err) {
    console.log(err);
  });
  process.on("unhandledRejection", (error: Error) => {
    console.log("Unhandled Promise Rejection:", error);
  });
}

bootstrap();
