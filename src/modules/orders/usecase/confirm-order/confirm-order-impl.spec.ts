import { Test, TestingModule } from "@nestjs/testing";

import { OrdersPrismaRepository } from "@orders/repository/orders.prisma-repository";
import { CONFIRM_ORDER } from "@orders/usecase/confirm-order/confirm-order";
import { ConfirmOrderImpl } from "@orders/usecase/confirm-order/confirm-order-impl";

jest.mock("@orders/orders.repository");

describe("ConfirmOrder", () => {
  let confirmOrderService: ConfirmOrderImpl;
  let ordersRepository: OrdersPrismaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CONFIRM_ORDER,
          useClass: ConfirmOrderImpl,
        },
        OrdersPrismaRepository,
      ],
    }).compile();

    confirmOrderService = module.get<ConfirmOrderImpl>(CONFIRM_ORDER);
    ordersRepository = module.get<OrdersPrismaRepository>(OrdersPrismaRepository);
  });

  // it("ConfirmOrdersDto를 인자로 confirmOrderService.execute를 실행하면 mockConfirmOrdersDto.toEntity()를 인자로 updateOrderStatus 실행하나?", async () => {
  //   const mockConfirmOrdersDto = ConfirmOrdersDto.of({
  //     orderId: 1n,
  //   });
  //
  //   await confirmOrderService.execute(mockConfirmOrdersDto);
  //   expect(ordersRepository.updateOrderStatus).toBeCalledTimes(1);
  //   expect(ordersRepository.updateOrderStatus).toBeCalledWith(mockConfirmOrdersDto.toEntity());
  // });
});
