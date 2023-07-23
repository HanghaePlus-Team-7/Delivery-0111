import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

import { UpdateOrderStatusCommand } from "@order/service/dto/update-order-status.command";
import { OrderService } from "@order/service/order.service";
import { CONFIRM_ORDER, ConfirmOrder } from "@order/usecase/confirm-order/confirm-order";
import { GET_ORDERS_OF_STORE, GetOrdersOfStore } from "@order/usecase/get-orders-of-store/get-orders-of-store";

import { NotificationEvent } from "@notification/notification.event";

@Injectable()
export class OrderServiceImpl implements OrderService {
  constructor(
    @Inject(CONFIRM_ORDER) private readonly confirmOrderUseCase: ConfirmOrder,
    @Inject(GET_ORDERS_OF_STORE) private readonly getOrdersOfStoreUseCase: GetOrdersOfStore,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async confirmOrder(updateOrderStatusCommand: UpdateOrderStatusCommand): Promise<void> {
    await this.confirmOrderUseCase.execute(updateOrderStatusCommand.toConfirmOrderEntity());
    this.eventEmitter.emit(NotificationEvent.ORDER_CONFIRMED, updateOrderStatusCommand.toNotification());
  }

  async getOrdersOfStore(id: string): Promise<any[]> {
    return await this.getOrdersOfStoreUseCase.execute(id);
  }
}
