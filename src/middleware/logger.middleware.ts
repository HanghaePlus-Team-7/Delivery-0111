import { Injectable, NestMiddleware } from "@nestjs/common";

import { NextFunction, Request, Response } from "express";

import { WinstonLogger } from "@root/middleware/winston-logger";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: WinstonLogger = new WinstonLogger();
  // constructor(private readonly logger: WinstonLogger) {}

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get("user-a gent") ?? "";

    response.on("finish", () => {
      const { statusCode } = response;
      const contentLength = response.get("content-length");
      this.logger.info(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
    });

    next();
  }
}
