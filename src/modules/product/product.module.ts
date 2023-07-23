import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import { MulterConfigService } from "@root/middleware/multer/multer-config.service";
import { PrismaModule } from "@root/prisma/prisma.module";

import { ProductController } from "@product/controller/product.controller";
import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";
import { PRODUCT_REPOSITORY } from "@product/repository/product.repository";
import { ProductService } from "@product/service/product.service";
import { AddProduct } from "@product/usecase/add-product/add-product";

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    PrismaModule,
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductPrismaRepository,
    },
    ProductService,
    AddProduct,
  ],
})
export class ProductModule {}
