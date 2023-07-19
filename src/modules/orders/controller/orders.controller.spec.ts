import { Test, TestingModule } from "@nestjs/testing";

import { OrdersController } from "@orders/controller/orders.controller";
import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { ORDERS_SERVICE, OrdersService } from "@orders/service/orders.service";
import { OrdersServiceImpl } from "@orders/service/orders.service-impl";

jest.mock("./services/confirm-order/confirm-order.service");

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
    ordersService = module.get<OrdersServiceImpl>(ORDERS_SERVICE);

    jest.clearAllMocks();
  });

  describe("주문 확정 (confirmOrder)", () => {
    it("주문 확정 서비스를 ConfirmOrdersDto의 인스턴스를 argument로 호출하나?", async () => {
      const orderId = 1n;
      const confirmOrdersDto = ConfirmOrdersDto.of({ orderId });

      await controller.confirmOrder(confirmOrdersDto);
      expect(ordersService.confirmOrder).toBeCalledTimes(1);
      expect(ordersService.confirmOrder).toBeCalledWith(confirmOrdersDto);
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
