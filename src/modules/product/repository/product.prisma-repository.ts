import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "@root/prisma/prisma.service";

import { AddProductParam } from "@product/repository/interface/add-product-param";
import { ProductRepository } from "@product/repository/product.repository";

import { ProductEntity } from "../entity/product.entity";
import { GetAllProducts } from "../usecase/get-all-products/get-all-products";

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

  async getAllProducts(param: GetAllProducts): Promise<ProductEntity[]> {
    try {
      await this.prismaService.product.findMany({});
      return;
    } catch (err) {}
  }
}
