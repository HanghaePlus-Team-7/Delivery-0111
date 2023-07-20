import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import { MulterConfigService } from "@root/middleware/multer/multer-config.service";

import { ProductsController } from "@products/controller/products.controller";

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
