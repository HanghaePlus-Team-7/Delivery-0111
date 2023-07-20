import { Module } from "@nestjs/common";

import { LoggerMiddleware } from "@root/middleware/logger/logger.middleware";

@Module({
  imports: [],
  providers: [LoggerMiddleware],
  exports: [LoggerMiddleware],
})
export class LoggerModule {}
