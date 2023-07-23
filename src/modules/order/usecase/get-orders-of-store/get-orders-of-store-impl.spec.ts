import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidV4 } from "uuid";

import { OrderPrismaRepository } from "@order/repository/order.prisma-repository";
import { OrderRepository, ORDERS_REPOSITORY } from "@order/repository/order.repository";
import { GET_ORDERS_OF_STORE, GetOrdersOfStore } from "@order/usecase/get-orders-of-store/get-orders-of-store";
import { GetOrdersOfStoreImpl } from "@order/usecase/get-orders-of-store/get-orders-of-store-impl";
jest.mock("@order/repository/order.prisma-repository");

describe("GetOrdersOfStoreService", () => {
  let service: GetOrdersOfStore;
  let repository: OrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GET_ORDERS_OF_STORE,
          useClass: GetOrdersOfStoreImpl,
        },
        {
          provide: ORDERS_REPOSITORY,
          useClass: OrderPrismaRepository,
        },
      ],
    }).compile();

    service = module.get<GetOrdersOfStore>(GET_ORDERS_OF_STORE);
    repository = module.get<OrderRepository>(ORDERS_REPOSITORY);
  });

  it("ordersRepository.getOrdersOfStore 실행함? ", async () => {
    const id = uuidV4();
    await service.execute(id);
    expect(repository.getOrdersOfStore).toBeCalledTimes(1);
    expect(repository.getOrdersOfStore).toBeCalledWith(id);
  });
});
