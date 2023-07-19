import { Inject, Injectable } from "@nestjs/common";

import { NOTIFICATION_SERVICE, NotificationService } from "@root/modules/notification/notification.service";

import { UpdateOrderStatusCommand } from "@orders/service/dto/update-order-status.command";
import { OrdersService } from "@orders/service/orders.service";
import { CONFIRM_ORDER, ConfirmOrder } from "@orders/usecase/confirm-order/confirm-order";
import { GET_ORDERS_OF_STORE, GetOrdersOfStore } from "@orders/usecase/get-orders-of-store/get-orders-of-store";

@Injectable()
export class OrdersServiceImpl implements OrdersService {
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: NotificationService,
    @Inject(CONFIRM_ORDER) private readonly confirmOrderUseCase: ConfirmOrder,
    @Inject(GET_ORDERS_OF_STORE) private readonly getOrdersOfStoreUseCase: GetOrdersOfStore,
  ) {}

  async confirmOrder(updateOrderStatusCommand: UpdateOrderStatusCommand): Promise<void> {
    await this.confirmOrderUseCase.execute(updateOrderStatusCommand.toConfirmOrderEntity());
    await this.notificationService.sendNotification(updateOrderStatusCommand.toNotification());
  }

  async getOrdersOfStore(id: bigint): Promise<any[]> {
    return await this.getOrdersOfStoreUseCase.execute(id);
  }
}
