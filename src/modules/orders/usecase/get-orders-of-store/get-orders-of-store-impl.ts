import { Inject, Injectable } from "@nestjs/common";

import { OrdersPrismaRepository } from "@orders/repository/orders.prisma-repository";
import { ORDERS_REPOSITORY } from "@orders/repository/orders.repository";
import { GetOrdersOfStore } from "@orders/usecase/get-orders-of-store/get-orders-of-store";

@Injectable()
export class GetOrdersOfStoreImpl implements GetOrdersOfStore {
  constructor(@Inject(ORDERS_REPOSITORY) private readonly ordersRepository: OrdersPrismaRepository) {}

  async execute(id: bigint) {
    return await this.ordersRepository.getOrdersOfStore(id);
  }
}
