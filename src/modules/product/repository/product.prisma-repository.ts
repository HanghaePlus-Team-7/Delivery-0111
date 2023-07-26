import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "@root/prisma/prisma.service";

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

  // ProductEntity[] : Product 테이블에 photoPath 컬럼이 없어서 에러나서 일단 any로 지정
  async getAllProducts(): Promise<any[]> {
    try {
      return await this.prismaService.product.findMany();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
