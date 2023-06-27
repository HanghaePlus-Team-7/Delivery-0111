import { Test, TestingModule } from "@nestjs/testing";

import { AddCartService } from "@cart/services/add-cart/add-cart.service";

describe("cart:e2e", () => {
  let service;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [AddCartService],
    }).compile();

    service = moduleFixture.get<AddCartService>(AddCartService);
  });

  it("Service layer is not undefined.", () => {
    expect(AddCartService).toBeDefined();
  });

  // it("product가 10개 초과면 장바구니 추가 실패", async () => {
  //   const
  // });
});
