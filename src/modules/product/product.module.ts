import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import { MulterConfigService } from "@root/middleware/multer/multer-config.service";
import { PrismaModule } from "@root/prisma/prisma.module";

import { ProductController } from "@product/controller/product.controller";
import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";
import { PRODUCT_REPOSITORY } from "@product/repository/product.repository";
import { AddProductUseCase } from "@product/usecase/add-product.use-case";
import { GetAllProductsUseCase } from "@product/usecase/get-all-products.use-case";

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
    GetAllProductsUseCase,
    AddProductUseCase,
  ],
})
export class ProductModule {}
