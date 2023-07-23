import { Test, TestingModule } from "@nestjs/testing";

import { ProductService } from "@product/service/product.service";
import { AddProduct } from "@product/usecase/add-product/add-product";

jest.mock("@product/usecase/add-product/add-product");
describe("ProductService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, AddProduct],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
