import { Inject, Injectable } from "@nestjs/common";

import { OrderPrismaRepository } from "@order/repository/order.prisma-repository";
import { ORDERS_REPOSITORY } from "@order/repository/order.repository";
import { GetOrdersOfStore } from "@order/usecase/get-orders-of-store/get-orders-of-store";

@Injectable()
export class GetOrdersOfStoreImpl implements GetOrdersOfStore {
  constructor(@Inject(ORDERS_REPOSITORY) private readonly ordersRepository: OrderPrismaRepository) {}

  async execute(id: bigint) {
    return await this.ordersRepository.getOrdersOfStore(id);
  }
}
