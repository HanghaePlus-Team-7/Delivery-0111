import { Test, TestingModule } from "@nestjs/testing";
import { AddBasketService } from "@shopping-basket/services/add-basket/add-basket.service";

describe("shopping-basket:e2e", () => {
  let service;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [AddBasketService],
    }).compile();

    service = moduleFixture.get<AddBasketService>(AddBasketService);
  });

  it("Service layer is not undefined.", () => {
    expect(AddBasketService).toBeDefined();
  });

  // it("product가 10개 초과면 장바구니 추가 실패", async () => {
  //   const
  // });
});
