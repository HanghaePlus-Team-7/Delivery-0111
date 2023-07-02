import {
  BadRequestException,
  ClassSerializerInterceptor,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { BigIntToStringInterceptor } from "./bigIntToStringInterceptor";
import { CustomValidationError } from "./customValidationError";

export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new BigIntToStringInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: {
        value: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors.map((e) => new CustomValidationError(e)));
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Delivery0111 API")
    .setDescription("Delivery0111 API description")
    .setVersion("0.1")
    .addTag("Delivery0111")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}
