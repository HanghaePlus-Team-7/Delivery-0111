import { Injectable } from "@nestjs/common";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { OrdersRepository } from "@orders/orders.repository";
import { ConfirmOrder } from "@orders/services/confirm-order/confirm-order.interface";

@Injectable()
export class ConfirmOrderService implements ConfirmOrder {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute(confirmOrdersDto: ConfirmOrdersDto): Promise<void> {
    return await this.ordersRepository.updateOrderStatus(confirmOrdersDto.toEntity());
  }
}
