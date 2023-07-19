import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";

import { ConfirmOrder as ConfirmOrderType } from "@orders/entities/orders.type";
import { OrdersPrismaRepository } from "@orders/repository/orders.prisma-repository";
import { ORDERS_REPOSITORY } from "@orders/repository/orders.repository";
import { ConfirmOrder } from "@orders/usecase/confirm-order/confirm-order";

@Injectable()
export class ConfirmOrderImpl implements ConfirmOrder {
  constructor(@Inject(ORDERS_REPOSITORY) private readonly ordersRepository: OrdersPrismaRepository) {}

  async execute(ordersEntity: ConfirmOrderType): Promise<void> {
    if (!ordersEntity.id || !ordersEntity.status || !ordersEntity.confirmedOrderAt)
      return Promise.reject(new InternalServerErrorException());

    return await this.ordersRepository.updateOrderStatus(
      ordersEntity.id,
      ordersEntity.status,
      ordersEntity.confirmedOrderAt,
    );
  }
}
