import { Test, TestingModule } from "@nestjs/testing";

import { ProductsController } from "@products/controller/products.controller";

describe("ProductsController", () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  describe("메뉴추가", () => {});
});
