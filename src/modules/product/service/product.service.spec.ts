import { Test, TestingModule } from "@nestjs/testing";

import { ProductEntity } from "@product/entity/product.entity";
import { AddProductCommand } from "@product/service/dto/add-product.command";
import { ProductService } from "@product/service/product.service";
import { AddProduct } from "@product/usecase/add-product/add-product";

jest.mock("@product/usecase/add-product/add-product");

describe("ProductService", () => {
  let service: ProductService;
  let addProductUseCase: AddProduct;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, AddProduct],
    }).compile();

    service = module.get<ProductService>(ProductService);
    addProductUseCase = module.get<AddProduct>(AddProduct);
  });

  describe("addProduct", () => {
    it("제대로 된 argument 로 실행함?", async () => {
      const storeId = "storeId";
      const name = "name";
      const price = 1;
      const description = "description";
      const photoPath = "photoPath";

      const addProductCommand = new AddProductCommand({ storeId, name, price, description, photoPath });
      const spyProductEntityForAddProduct = jest.spyOn(ProductEntity, "forAddProduct");

      await service.addProduct(addProductCommand);

      expect(spyProductEntityForAddProduct).toBeCalledTimes(1);
      expect(addProductUseCase.execute).toBeCalledWith(spyProductEntityForAddProduct.mock.results[0].value);
    });
  });
});
