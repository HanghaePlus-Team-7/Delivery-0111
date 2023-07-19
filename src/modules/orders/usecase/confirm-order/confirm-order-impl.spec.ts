import { Test, TestingModule } from "@nestjs/testing";

import { OrdersEntity } from "@orders/entities/orders.entity";
import { ConfirmOrder as ConfirmOrderType } from "@orders/entities/orders.type";
import { OrdersPrismaRepository } from "@orders/repository/orders.prisma-repository";
import { ORDERS_REPOSITORY, OrdersRepository } from "@orders/repository/orders.repository";
import { CONFIRM_ORDER, ConfirmOrder } from "@orders/usecase/confirm-order/confirm-order";
import { ConfirmOrderImpl } from "@orders/usecase/confirm-order/confirm-order-impl";

jest.mock("@orders/repository/orders.prisma-repository");

describe("ConfirmOrder", () => {
  let confirmOrder: ConfirmOrder;
  let ordersRepository: OrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CONFIRM_ORDER,
          useClass: ConfirmOrderImpl,
        },
        {
          provide: ORDERS_REPOSITORY,
          useClass: OrdersPrismaRepository,
        },
      ],
    }).compile();

    confirmOrder = module.get<ConfirmOrder>(CONFIRM_ORDER);
    ordersRepository = module.get<OrdersRepository>(ORDERS_REPOSITORY);
  });

  it("confirmOrder.execute를 실행하면 ordersRepository.updateOrderStatus 실행하나?", async () => {
    const confirmOrderEntity: ConfirmOrderType = OrdersEntity.forConfirmOrder(1n);

    await confirmOrder.execute(confirmOrderEntity);
    expect(ordersRepository.updateOrderStatus).toBeCalledTimes(1);
    expect(ordersRepository.updateOrderStatus).toBeCalledWith(
      confirmOrderEntity.id,
      confirmOrderEntity.status,
      confirmOrderEntity.confirmedOrderAt,
    );
  });

  // TODO: 테스트하기가 어려움, 설계를 잘못했나? 불변객체로 만들지 말까?
  it.todo("orderEntity.id 없으면 에러남?");
  it.todo("orderEntity.status 없으면 에러남?");
  it.todo("orderEntity.confirmedOrderAt 없으면 에러남?");
});
