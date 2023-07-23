import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { PrismaService } from "@root/prisma/prisma.service";

import { OrderStatus } from "@order/entity/order-status";
import { OrderRepository } from "@order/repository/order.repository";

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async updateOrderStatus(id: string, status: OrderStatus, confirmedOrderAt: Date): Promise<void> {
    try {
      await this.prismaService.order.update({
        where: {
          id,
        },
        data: {
          status,
          confirmedOrderAt,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.meta?.cause === "Record to update not found.")
        throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }

  async getOrdersOfStore(id: string) {
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
