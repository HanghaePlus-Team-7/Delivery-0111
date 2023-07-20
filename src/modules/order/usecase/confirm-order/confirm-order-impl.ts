import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";

import { ConfirmOrderType } from "@order/entity/order.type";
import { OrderPrismaRepository } from "@order/repository/order.prisma-repository";
import { ORDERS_REPOSITORY } from "@order/repository/order.repository";
import { ConfirmOrder } from "@order/usecase/confirm-order/confirm-order";

@Injectable()
export class ConfirmOrderImpl implements ConfirmOrder {
  constructor(@Inject(ORDERS_REPOSITORY) private readonly ordersRepository: OrderPrismaRepository) {}

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
