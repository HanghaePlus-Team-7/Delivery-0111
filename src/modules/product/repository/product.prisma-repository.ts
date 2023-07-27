import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "@root/prisma/prisma.service";

import { ProductEntity } from "@product/entity/product.entity";
import { ProductRepository } from "@product/repository/product.repository";

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addProduct(productEntity: ProductEntity): Promise<ProductEntity> {
    if (
      !productEntity.id ||
      !productEntity.name ||
      !productEntity.price ||
      !productEntity.description ||
      !productEntity.image ||
      !productEntity.storeId
    )
      throw new BadRequestException();

    try {
      return await this.prismaService.product.create({
        data: {
          id: productEntity.id,
          storeId: productEntity.storeId,
          name: productEntity.name,
          price: productEntity.price,
          description: productEntity.description,
          image: productEntity.image,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    try {
      return await this.prismaService.product.findMany();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
