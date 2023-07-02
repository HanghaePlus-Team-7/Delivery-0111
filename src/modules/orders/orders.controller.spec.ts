import { Test, TestingModule } from "@nestjs/testing";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { OrdersController } from "@orders/orders.controller";
import { CONFIRM_ORDER, ConfirmOrder } from "@orders/services/confirm-order/confirm-order.interface";
import { ConfirmOrderService } from "@orders/services/confirm-order/confirm-order.service";
import {
  GET_ORDERS_OF_STORE,
  GetOrdersOfStore,
} from "@orders/services/get-orders-of-store/get-orders-of-store.interface";
import { GetOrdersOfStoreService } from "@orders/services/get-orders-of-store/get-orders-of-store.service";

jest.mock("./services/confirm-order/confirm-order.service");

describe("OrdersController", () => {
  let controller: OrdersController;
  let confirmOrderService: ConfirmOrder;
  let getOrdersOfStore: GetOrdersOfStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: CONFIRM_ORDER,
          useClass: ConfirmOrderService,
        },
        {
          provide: GET_ORDERS_OF_STORE,
          useClass: GetOrdersOfStoreService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    confirmOrderService = module.get<ConfirmOrderService>(CONFIRM_ORDER);
    getOrdersOfStore = module.get<GetOrdersOfStoreService>(GET_ORDERS_OF_STORE);

    jest.clearAllMocks();
  });

  describe("주문 확정 (confirmOrder)", () => {
    it("주문 확정 서비스를 ConfirmOrdersDto의 인스턴스를 argument로 호출하나?", async () => {
      const orderId = 1n;
      const confirmOrdersDto = ConfirmOrdersDto.of({ orderId });

      await controller.confirmOrder(confirmOrdersDto);
      expect(confirmOrderService.execute).toBeCalledTimes(1);
      expect(confirmOrderService.execute).toBeCalledWith(confirmOrdersDto);
    });
  });

  describe("주문 전체 조회 (getOrdersOfStore)", () => {
    it("주문 전체 조회 서비스를 가게의 아이디로 실행하나?", async () => {
      const storeId = "1";

      getOrdersOfStore.execute = jest.fn();

      await controller.getOrdersOfStore(storeId);
      expect(getOrdersOfStore.execute).toBeCalledTimes(1);
      expect(getOrdersOfStore.execute).toBeCalledWith(BigInt(storeId));
    });
  });
});
