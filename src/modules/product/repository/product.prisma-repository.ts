import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "@root/prisma/prisma.service";

import { ProductEntity } from "@product/entity/product.entity";
import { AddProductParam } from "@product/repository/interface/add-product-param";
import { ProductRepository } from "@product/repository/product.repository";

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addProduct(param: AddProductParam): Promise<void> {
    try {
      await this.prismaService.product.create({
        data: {
          id: param.id,
          storeId: param.storeId,
          name: param.name,
          price: param.price,
          description: param.description,
          image: param.image,
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
