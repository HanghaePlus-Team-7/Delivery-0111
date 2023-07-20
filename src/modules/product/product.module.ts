import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import { MulterConfigService } from "@root/middleware/multer/multer-config.service";

import { ProductController } from "@product/controller/product.controller";
import { PRODUCT_SERVICE } from "@product/service/product.service";
import { ProductServiceImpl } from "@product/service/product.service-impl";

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductServiceImpl,
    },
  ],
})
export class ProductModule {}
