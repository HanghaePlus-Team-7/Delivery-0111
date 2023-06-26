import { Test, TestingModule } from "@nestjs/testing";
import { ShoppingBasketController } from "@shopping-basket/shopping-basket.controller";

describe("ShoppingBasketController", () => {
  let controller: ShoppingBasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingBasketController],
    }).compile();

    controller = module.get<ShoppingBasketController>(ShoppingBasketController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
