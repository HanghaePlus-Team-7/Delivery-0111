import { Test, TestingModule } from "@nestjs/testing";

import { OrdersPrismaRepository } from "@orders/repository/orders.prisma-repository";

import { GetOrdersOfStoreImpl } from "./get-orders-of-store-impl";

jest.mock("@orders/orders.repository");

describe("GetOrdersOfStoreService", () => {
  let service: GetOrdersOfStoreImpl;
  let repository: OrdersPrismaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrdersOfStoreImpl, OrdersPrismaRepository],
    }).compile();

    service = module.get<GetOrdersOfStoreImpl>(GetOrdersOfStoreImpl);
    repository = module.get<OrdersPrismaRepository>(OrdersPrismaRepository);
  });

  it("ordersRepository.getOrdersOfStore 실행함? ", async () => {
    await service.execute(1n);
    expect(repository.getOrdersOfStore).toBeCalledTimes(1);
    expect(repository.getOrdersOfStore).toBeCalledWith(1n);
  });
});
