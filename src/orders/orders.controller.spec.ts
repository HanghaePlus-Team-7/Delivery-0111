import { Test, TestingModule } from "@nestjs/testing";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { OrdersController } from "@orders/orders.controller";
import { CONFIRM_ORDER } from "@orders/services/confirm-order/confirm-order.interface";
import { ConfirmOrderService } from "@orders/services/confirm-order/confirm-order.service";

jest.mock("./usecase/confirm-order/confirm-order.service");

describe("OrdersController", () => {
  let controller: OrdersController;
  let confirmOrderService: ConfirmOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: CONFIRM_ORDER,
          useClass: ConfirmOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    confirmOrderService = module.get<ConfirmOrderService>(ConfirmOrderService);

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
});
