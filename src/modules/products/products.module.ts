import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import { MulterConfigService } from "@root/middleware/multer/multer-config.service";

import { ProductsController } from "@products/controller/products.controller";
import { PRODUCT_SERVICE } from "@products/service/product.service";

import { ProductServiceImpl } from "./service/product.service-impl";

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductServiceImpl,
    },
  ],
})
export class ProductsModule {}
