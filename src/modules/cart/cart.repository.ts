import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "@root/prisma/prisma.service";

import { CartEntity } from "./cart.entity";

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addCart({ id, userId, productId, amount }: CartEntity): Promise<void> {
    try {
      await this.prismaService.cart.create({
        data: {
          id: id,
          userId: userId,
          productId: productId,
          amount: amount,
        },
      });
    } catch (e) {
      // https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      throw new InternalServerErrorException();
    }
  }
}
