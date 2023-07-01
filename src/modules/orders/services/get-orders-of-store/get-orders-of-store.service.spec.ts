import { Test, TestingModule } from "@nestjs/testing";

import { OrdersRepository } from "@orders/orders.repository";

import { GetOrdersOfStoreService } from "./get-orders-of-store.service";

jest.mock("@orders/orders.repository");

describe("GetOrdersOfStoreService", () => {
  let service: GetOrdersOfStoreService;
  let repository: OrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrdersOfStoreService, OrdersRepository],
    }).compile();

    service = module.get<GetOrdersOfStoreService>(GetOrdersOfStoreService);
    repository = module.get<OrdersRepository>(OrdersRepository);
  });

  it("ordersRepository.getOrdersOfStore 실행함? ", async () => {
    await service.execute(1n);
    expect(repository.getOrdersOfStore).toBeCalledTimes(1);
    expect(repository.getOrdersOfStore).toBeCalledWith(1n);
  });
});
