import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidV4 } from "uuid";

import { ProductEntity } from "@product/entity/product.entity";
import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";
import { PRODUCT_REPOSITORY, ProductRepository } from "@product/repository/product.repository";
import { AddProductUseCase } from "@product/usecase/add-product.use-case";
import { AddProductCommand } from "@product/usecase/dto/add-product.command";

jest.mock("@product/repository/product.prisma-repository");

describe("AddProduct", () => {
  let addProduct: AddProductUseCase;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddProductUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useClass: ProductPrismaRepository,
        },
      ],
    }).compile();

    addProduct = module.get<AddProductUseCase>(AddProductUseCase);
    productRepository = module.get<ProductRepository>(PRODUCT_REPOSITORY);
  });

  describe("addProduct", () => {
    it("제대로 된 argument 로 실행함?", async () => {
      const storeId = uuidV4();
      const name = "name";
      const price = 1;
      const description = "description";
      const image = "image path";

      const addProductCommand = new AddProductCommand({
        storeId,
        name,
        price,
        description,
        image,
      });
      const spyProductEntityForAddProduct = jest.spyOn(ProductEntity, "forAddProduct");

      await addProduct.execute(addProductCommand);
      expect(spyProductEntityForAddProduct).toBeCalledTimes(1);
      expect(productRepository.addProduct).toBeCalledWith(spyProductEntityForAddProduct.mock.results[0].value);
    });
  });
});
