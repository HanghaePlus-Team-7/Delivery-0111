import { Test, TestingModule } from "@nestjs/testing";

import { OrderPrismaRepository } from "@order/repository/order.prisma-repository";
import { GetOrdersOfStoreImpl } from "@order/usecase/get-orders-of-store/get-orders-of-store-impl";

jest.mock("@orders/orders.repository");

describe("GetOrdersOfStoreService", () => {
  let service: GetOrdersOfStoreImpl;
  let repository: OrderPrismaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrdersOfStoreImpl, OrderPrismaRepository],
    }).compile();

    service = module.get<GetOrdersOfStoreImpl>(GetOrdersOfStoreImpl);
    repository = module.get<OrderPrismaRepository>(OrderPrismaRepository);
  });

  it("ordersRepository.getOrdersOfStore 실행함? ", async () => {
    await service.execute(1n);
    expect(repository.getOrdersOfStore).toBeCalledTimes(1);
    expect(repository.getOrdersOfStore).toBeCalledWith(1n);
  });
});
