import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidV4 } from "uuid";

import { OrderMessage } from "@order/entity/order-message";
import { UpdateOrderStatusCommand } from "@order/service/dto/update-order-status.command";
import { ORDERS_SERVICE, OrderService } from "@order/service/order.service";
import { OrderServiceImpl } from "@order/service/order.service-impl";
import { CONFIRM_ORDER, ConfirmOrder } from "@order/usecase/confirm-order/confirm-order";
import { ConfirmOrderImpl } from "@order/usecase/confirm-order/confirm-order-impl";
import { GET_ORDERS_OF_STORE, GetOrdersOfStore } from "@order/usecase/get-orders-of-store/get-orders-of-store";
import { GetOrdersOfStoreImpl } from "@order/usecase/get-orders-of-store/get-orders-of-store-impl";

import { NotificationEvent } from "@notification/notification.event";

jest.mock("@order/usecase/confirm-order/confirm-order-impl");
jest.mock("@order/usecase/get-orders-of-store/get-orders-of-store-impl");
jest.mock("@nestjs/event-emitter");

describe("OrdersService", () => {
  let service: OrderService;
  let confirmOrderUseCase: ConfirmOrder;
  let getOrdersOfStoreUseCase: GetOrdersOfStore;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ORDERS_SERVICE,
          useClass: OrderServiceImpl,
        },
        {
          provide: CONFIRM_ORDER,
          useValue: ConfirmOrderImpl,
        },
        {
          provide: GET_ORDERS_OF_STORE,
          useValue: GetOrdersOfStoreImpl,
        },
        EventEmitter2,
      ],
    }).compile();

    service = module.get<OrderService>(ORDERS_SERVICE);
    confirmOrderUseCase = module.get<ConfirmOrder>(CONFIRM_ORDER);
    getOrdersOfStoreUseCase = module.get<GetOrdersOfStore>(GET_ORDERS_OF_STORE);
    eventEmitter2 = module.get<EventEmitter2>(EventEmitter2);
  });

  describe("주문 확정", () => {
    let updateOrderStatusCommand: UpdateOrderStatusCommand;
    beforeEach(() => {
      updateOrderStatusCommand = new UpdateOrderStatusCommand(uuidV4(), OrderMessage.CONFIRMED);
      confirmOrderUseCase.execute = jest.fn();
    });
    it("confirmOrder 실행하면 confirmOrderUseCase실행함?", async () => {
      await service.confirmOrder(updateOrderStatusCommand);
      expect(confirmOrderUseCase.execute).toBeCalledTimes(1);
    });

    it("confirmOrder 실행하면 notificationService 실행함?", async () => {
      await service.confirmOrder(updateOrderStatusCommand);
      expect(eventEmitter2.emit).toBeCalledTimes(1);
      expect(eventEmitter2.emit).toBeCalledWith(
        NotificationEvent.ORDER_CONFIRMED,
        updateOrderStatusCommand.toNotification(),
      );
    });
  });
});
