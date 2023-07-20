import { Test, TestingModule } from "@nestjs/testing";

import { ProductController } from "@product/controller/product.controller";

describe("ProductsController", () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  describe("메뉴추가", () => {});
});
