import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidV4 } from "uuid";

import { ProductEntity } from "@product/entity/product.entity";
import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";
import { PRODUCT_REPOSITORY, ProductRepository } from "@product/repository/product.repository";
import { AddProduct } from "@product/usecase/add-product/add-product";

jest.mock("@product/repository/product.prisma-repository");

describe("AddProduct", () => {
  let addProduct: AddProduct;
  let productRepository: ProductRepository;

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

    addProduct = module.get<AddProduct>(AddProduct);
    productRepository = module.get<ProductRepository>(PRODUCT_REPOSITORY);
  });

  describe("addProduct", () => {
    it("제대로 된 argument 로 실행함?", async () => {
      const id = uuidV4();
      const storeId = uuidV4();
      const name = "name";
      const price = 1;
      const description = "description";
      const image = "image path";

      const productEntity = new ProductEntity({
        id,
        storeId,
        name,
        price,
        description,
        image,
      });
      await addProduct.execute(productEntity);

      expect(productRepository.addProduct).toBeCalledWith({
        id: productEntity.id,
        storeId: productEntity.storeId,
        name: productEntity.name,
        price: productEntity.price,
        description: productEntity.description,
        image: productEntity.image,
      });
    });
  });
});
