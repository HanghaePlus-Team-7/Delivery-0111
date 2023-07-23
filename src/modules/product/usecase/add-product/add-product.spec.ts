import { Test, TestingModule } from "@nestjs/testing";

import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";
import { PRODUCT_REPOSITORY } from "@product/repository/product.repository";
import { AddProduct } from "@product/usecase/add-product/add-product";

jest.mock("@product/repository/product.prisma-repository");
describe("AddProduct", () => {
  let provider: AddProduct;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddProduct,
        {
          provide: PRODUCT_REPOSITORY,
          useClass: ProductPrismaRepository,
        },
      ],
    }).compile();

    provider = module.get<AddProduct>(AddProduct);
  });

  it("should be defined", () => {
    expect(provider).toBeDefined();
  });
});
