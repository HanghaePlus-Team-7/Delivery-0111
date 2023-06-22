import { Test, TestingModule } from "@nestjs/testing";
import { OrdersController } from "./orders.controller";
import { ConfirmOrderService } from "./usecase/confirm-order/confirm-order.service";
import { ConfirmOrdersDto } from "./dto/request/confirm-orders.dto";

jest.mock("./usecase/confirm-order/confirm-order.service");

describe("OrdersController", () => {
  let controller: OrdersController;
  let confirmOrderService: ConfirmOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [ConfirmOrderService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    confirmOrderService = module.get<ConfirmOrderService>(ConfirmOrderService);

    jest.clearAllMocks();
  });

  describe("주문 확정 (confirmOrder)", () => {
    it("주문 확정 서비스를 ConfirmOrdersDto의 인스턴스를 argument로 호출하나?", async () => {
      const orderId = "a7ad368d-2728-427a-89b7-a223317aac08";
      const confirmOrdersDto = ConfirmOrdersDto.of({ orderId });

      await controller.confirmOrder(confirmOrdersDto);
      expect(confirmOrderService.execute).toBeCalledTimes(1);
      expect(confirmOrderService.execute).toBeCalledWith(confirmOrdersDto);
    });
  });
});
