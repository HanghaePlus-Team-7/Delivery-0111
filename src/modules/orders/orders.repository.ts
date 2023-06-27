import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { PrismaService } from "@root/prisma/prisma.service";

import { OrdersEntity } from "@orders/entities/orders.entity";

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async updateOrderStatus({ id, status }: OrdersEntity): Promise<void> {
    try {
      await this.prismaService.order.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.meta?.cause === "Record to update not found.")
        throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }
}
