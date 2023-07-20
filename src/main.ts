import { NestFactory } from "@nestjs/core";

import { setNestApp } from "@root/libs/common/set-nest-app";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setNestApp(app);
  await app.listen(3000);
}
bootstrap();
