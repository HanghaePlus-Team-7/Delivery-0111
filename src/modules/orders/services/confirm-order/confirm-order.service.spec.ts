import { Test, TestingModule } from "@nestjs/testing";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { OrdersRepository } from "@orders/orders.repository";
import { CONFIRM_ORDER } from "@orders/services/confirm-order/confirm-order.interface";
import { ConfirmOrderService } from "@orders/services/confirm-order/confirm-order.service";

jest.mock("@orders/orders.repository");

describe("ConfirmOrder", () => {
  let confirmOrderService: ConfirmOrderService;
  let ordersRepository: OrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CONFIRM_ORDER,
          useClass: ConfirmOrderService,
        },
        OrdersRepository,
      ],
    }).compile();

    confirmOrderService = module.get<ConfirmOrderService>(CONFIRM_ORDER);
    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
  });

  it("ConfirmOrdersDto를 인자로 confirmOrderService.execute를 실행하면 mockConfirmOrdersDto.toEntity()를 인자로 updateOrderStatus 실행하나?", async () => {
    const mockConfirmOrdersDto = ConfirmOrdersDto.of({
      orderId: 1n,
    });

    await confirmOrderService.execute(mockConfirmOrdersDto);
    expect(ordersRepository.updateOrderStatus).toBeCalledTimes(1);
    expect(ordersRepository.updateOrderStatus).toBeCalledWith(mockConfirmOrdersDto.toEntity());
  });
});
