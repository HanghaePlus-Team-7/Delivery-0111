import { Test, TestingModule } from "@nestjs/testing";

import { PRODUCT_SERVICE, ProductService } from "@products/service/product.service";
import { ProductServiceImpl } from "@products/service/product.service-impl";

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PRODUCT_SERVICE,
          useClass: ProductServiceImpl,
        },
      ],
    }).compile();

    service = module.get<ProductServiceImpl>(PRODUCT_SERVICE);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
