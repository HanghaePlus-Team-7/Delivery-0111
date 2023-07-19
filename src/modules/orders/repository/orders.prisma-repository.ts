import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { PrismaService } from "@root/prisma/prisma.service";

import { OrdersEntity } from "@orders/entities/orders.entity";
import { OrdersRepository } from "@orders/repository/orders.repository";

@Injectable()
export class OrdersPrismaRepository implements OrdersRepository {
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

  async getOrdersOfStore(id: bigint) {
    try {
      return await this.prismaService.order.findMany({
        where: {
          storeId: id,
        },
        select: {
          id: true,
          paymentType: true,
          paymentStatus: true,
          status: true,
          user: {
            select: {
              id: true,
              email: true,
              password: false,
              nickname: true,
              phone: true,
              address: true,
            },
          },
          store: {
            select: {
              id: true,
              email: true,
              password: false,
              name: true,
            },
          },
          OrderSheet: {
            select: {
              amount: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
