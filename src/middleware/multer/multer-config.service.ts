import * as fs from "fs";
import * as process from "process";

import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";

import { diskStorage } from "multer";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor() {}

  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const filePath = process.env.UPLOAD_FILE_PATH || "../test/data/uploads";
    const fileName = process.env.UPLOAD_FILE_NAME || "test.png";
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
          }

          cb(null, filePath);
        },
        filename: (req, file, cb) => {
          cb(null, fileName);
        },
      }),
    };
  }
}
