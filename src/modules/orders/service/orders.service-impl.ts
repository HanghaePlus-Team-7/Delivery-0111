import { Inject, Injectable } from "@nestjs/common";

import { NOTIFICATION_SERVICE, NotificationService } from "@root/modules/notification/notification.service";

import { ConfirmOrdersCommand } from "@orders/dto/command/confirm-orders.command";
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

  async confirmOrder(confirmOrdersCommand: ConfirmOrdersCommand): Promise<void> {
    await this.confirmOrderUseCase.execute(confirmOrdersCommand);
    await this.notificationService.sendNotification(confirmOrdersCommand.toNotification());
  }

  async getOrdersOfStore(id: bigint): Promise<any[]> {
    return await this.getOrdersOfStoreUseCase.execute(id);
  }
}
