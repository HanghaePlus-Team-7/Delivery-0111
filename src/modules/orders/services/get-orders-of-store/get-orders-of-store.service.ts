import { Injectable } from "@nestjs/common";

import { OrdersRepository } from "@orders/orders.repository";
import { GetOrdersOfStore } from "@orders/services/get-orders-of-store/get-orders-of-store.interface";

@Injectable()
export class GetOrdersOfStoreService implements GetOrdersOfStore {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute(id: bigint) {
    return await this.ordersRepository.getOrdersOfStore(id);
  }
}
