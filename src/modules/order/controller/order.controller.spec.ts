import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidV4 } from "uuid";

import { ConfirmOrderRequest } from "@order/controller/dto/confirm-order.request";
import { OrderController } from "@order/controller/order.controller";
import { ORDERS_SERVICE, OrderService } from "@order/service/order.service";
import { OrderServiceImpl } from "@order/service/order.service-impl";

jest.mock("@order/service/order.service-impl");

describe("OrdersController", () => {
  let controller: OrderController;
  let ordersService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: ORDERS_SERVICE,
          useClass: OrderServiceImpl,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    ordersService = module.get<OrderService>(ORDERS_SERVICE);

    jest.clearAllMocks();
  });

  describe("주문 확정 (confirmOrder)", () => {
    it("주문 확정 서비스를 ConfirmOrdersDto의 인스턴스를 argument로 호출하나?", async () => {
      const orderId = uuidV4();
      const confirmOrdersDto = ConfirmOrderRequest.of({ orderId });

      ordersService.confirmOrder = jest.fn();

      await controller.confirmOrder(confirmOrdersDto);
      expect(ordersService.confirmOrder).toBeCalledTimes(1);
      expect(ordersService.confirmOrder).toBeCalledWith(confirmOrdersDto.toDto());
    });
  });

  describe("주문 전체 조회 (getOrdersOfStore)", () => {
    it("주문 전체 조회 서비스를 가게의 아이디로 실행하나?", async () => {
      const storeId = uuidV4();

      await controller.getOrdersOfStore(storeId);
      expect(ordersService.getOrdersOfStore).toBeCalledTimes(1);
      expect(ordersService.getOrdersOfStore).toBeCalledWith(storeId);
    });
  });
});
