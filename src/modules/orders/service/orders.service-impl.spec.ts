import { Test, TestingModule } from "@nestjs/testing";

import { OrderMessage } from "@orders/entities/order-message";
import { UpdateOrderStatusCommand } from "@orders/service/dto/update-order-status.command";
import { ORDERS_SERVICE, OrdersService } from "@orders/service/orders.service";
import { CONFIRM_ORDER, ConfirmOrder } from "@orders/usecase/confirm-order/confirm-order";
import { ConfirmOrderImpl } from "@orders/usecase/confirm-order/confirm-order-impl";
import { GET_ORDERS_OF_STORE, GetOrdersOfStore } from "@orders/usecase/get-orders-of-store/get-orders-of-store";
import { GetOrdersOfStoreImpl } from "@orders/usecase/get-orders-of-store/get-orders-of-store-impl";

import { NOTIFICATION_SERVICE, NotificationService } from "@notification/notification.service";
import { NotificationServiceImpl } from "@notification/notification.service-impl";

import { OrdersServiceImpl } from "./orders.service-impl";

jest.mock("@orders/usecase/confirm-order/confirm-order-impl");
jest.mock("@orders/usecase/get-orders-of-store/get-orders-of-store-impl");
jest.mock("@notification/notification.service-impl");

describe("OrdersService", () => {
  let service: OrdersService;
  let notificationService: NotificationService;
  let confirmOrderUseCase: ConfirmOrder;
  let getOrdersOfStoreUseCase: GetOrdersOfStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ORDERS_SERVICE, useClass: OrdersServiceImpl },
        {
          provide: NOTIFICATION_SERVICE,
          useClass: NotificationServiceImpl,
        },
        {
          provide: CONFIRM_ORDER,
          useValue: ConfirmOrderImpl,
        },
        {
          provide: GET_ORDERS_OF_STORE,
          useValue: GetOrdersOfStoreImpl,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(ORDERS_SERVICE);
    notificationService = module.get<NotificationService>(NOTIFICATION_SERVICE);
    confirmOrderUseCase = module.get<ConfirmOrder>(CONFIRM_ORDER);
    getOrdersOfStoreUseCase = module.get<GetOrdersOfStore>(GET_ORDERS_OF_STORE);
  });

  describe("주문 확정", () => {
    let updateOrderStatusCommand: UpdateOrderStatusCommand;
    beforeEach(() => {
      updateOrderStatusCommand = new UpdateOrderStatusCommand(1n, OrderMessage.CONFIRMED);
      confirmOrderUseCase.execute = jest.fn();
    });
    it("confirmOrder 실행하면 confirmOrderUseCase실행함?", async () => {
      await service.confirmOrder(updateOrderStatusCommand);
      expect(confirmOrderUseCase.execute).toBeCalledTimes(1);
    });

    it("confirmOrder 실행하면 notificationService 실행함?", async () => {
      await service.confirmOrder(updateOrderStatusCommand);
      expect(notificationService.sendNotification).toBeCalledTimes(1);
      expect(notificationService.sendNotification).toBeCalledWith(updateOrderStatusCommand.toNotification());
    });
  });
});
