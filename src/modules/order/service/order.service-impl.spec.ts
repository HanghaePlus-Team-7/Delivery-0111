import { Test, TestingModule } from "@nestjs/testing";

import { OrderMessage } from "@order/entity/order-message";
import { UpdateOrderStatusCommand } from "@order/service/dto/update-order-status.command";
import { ORDERS_SERVICE, OrderService } from "@order/service/order.service";
import { OrderServiceImpl } from "@order/service/order.service-impl";
import { CONFIRM_ORDER, ConfirmOrder } from "@order/usecase/confirm-order/confirm-order";
import { ConfirmOrderImpl } from "@order/usecase/confirm-order/confirm-order-impl";
import { GET_ORDERS_OF_STORE, GetOrdersOfStore } from "@order/usecase/get-orders-of-store/get-orders-of-store";
import { GetOrdersOfStoreImpl } from "@order/usecase/get-orders-of-store/get-orders-of-store-impl";

import { SEND_NOTIFICATION, SendNotification } from "@notification/usecase/send-notification";
import { SendNotificationImpl } from "@notification/usecase/send-notification-impl";

jest.mock("@orders/usecase/confirm-order/confirm-order-impl");
jest.mock("@orders/usecase/get-orders-of-store/get-orders-of-store-impl");
jest.mock("@notification/notification.service-impl");

describe("OrdersService", () => {
  let service: OrderService;
  let notificationService: SendNotification;
  let confirmOrderUseCase: ConfirmOrder;
  let getOrdersOfStoreUseCase: GetOrdersOfStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ORDERS_SERVICE,
          useClass: OrderServiceImpl,
        },
        {
          provide: SEND_NOTIFICATION,
          useClass: SendNotificationImpl,
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

    service = module.get<OrderService>(ORDERS_SERVICE);
    notificationService = module.get<SendNotification>(SEND_NOTIFICATION);
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
      expect(notificationService.execute).toBeCalledTimes(1);
      expect(notificationService.execute).toBeCalledWith(updateOrderStatusCommand.toNotification());
    });
  });
});
