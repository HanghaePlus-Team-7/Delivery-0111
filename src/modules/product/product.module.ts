import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import { MulterConfigService } from "@root/middleware/multer/multer-config.service";

import { ProductController } from "@product/controller/product.controller";
import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";
import { PRODUCT_REPOSITORY } from "@product/repository/product.repository";
import { ProductService } from "@product/service/product.service";

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductPrismaRepository,
    },
  ],
})
export class ProductModule {}
