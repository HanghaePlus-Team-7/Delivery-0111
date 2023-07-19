import { Test, TestingModule } from "@nestjs/testing";

import { ConfirmOrdersRequest } from "@orders/controller/dto/confirm-orders.request";
import { OrdersController } from "@orders/controller/orders.controller";
import { ORDERS_SERVICE, OrdersService } from "@orders/service/orders.service";
import { OrdersServiceImpl } from "@orders/service/orders.service-impl";

jest.mock("@orders/service/orders.service-impl");

describe("OrdersController", () => {
  let controller: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: ORDERS_SERVICE,
          useClass: OrdersServiceImpl,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(ORDERS_SERVICE);

    jest.clearAllMocks();
  });

  describe("주문 확정 (confirmOrder)", () => {
    it("주문 확정 서비스를 ConfirmOrdersDto의 인스턴스를 argument로 호출하나?", async () => {
      const orderId = 1n;
      const confirmOrdersDto = ConfirmOrdersRequest.of({ orderId });

      ordersService.confirmOrder = jest.fn();

      await controller.confirmOrder(confirmOrdersDto);
      expect(ordersService.confirmOrder).toBeCalledTimes(1);
      expect(ordersService.confirmOrder).toBeCalledWith(confirmOrdersDto.toDto());
    });
  });

  describe("주문 전체 조회 (getOrdersOfStore)", () => {
    it("주문 전체 조회 서비스를 가게의 아이디로 실행하나?", async () => {
      const storeId = "1";

      await controller.getOrdersOfStore(storeId);
      expect(ordersService.getOrdersOfStore).toBeCalledTimes(1);
      expect(ordersService.getOrdersOfStore).toBeCalledWith(BigInt(storeId));
    });
  });
});
