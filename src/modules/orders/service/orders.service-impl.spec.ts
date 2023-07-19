import { Test, TestingModule } from "@nestjs/testing";

import { OrdersServiceImpl } from "./orders.service-impl";

describe("OrdersService", () => {
  let service: OrdersServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersServiceImpl],
    }).compile();

    service = module.get<OrdersServiceImpl>(OrdersServiceImpl);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
