import { NestFactory } from "@nestjs/core";

import { WINSTON_MODULE_PROVIDER } from "nest-winston";

import { setNestApp } from "@root/common/set-nest-app";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_PROVIDER));
  setNestApp(app);
  await app.listen(3000);
}
bootstrap();
