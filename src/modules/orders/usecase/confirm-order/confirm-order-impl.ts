import { Inject, Injectable } from "@nestjs/common";

import { ConfirmOrdersCommand } from "@orders/dto/command/confirm-orders.command";
import { OrdersPrismaRepository } from "@orders/repository/orders.prisma-repository";
import { ORDERS_REPOSITORY } from "@orders/repository/orders.repository";
import { ConfirmOrder } from "@orders/usecase/confirm-order/confirm-order";

@Injectable()
export class ConfirmOrderImpl implements ConfirmOrder {
  constructor(@Inject(ORDERS_REPOSITORY) private readonly ordersRepository: OrdersPrismaRepository) {}

  async execute(confirmOrdersCommand: ConfirmOrdersCommand): Promise<void> {
    return await this.ordersRepository.updateOrderStatus(confirmOrdersCommand.toEntity());
  }
}
