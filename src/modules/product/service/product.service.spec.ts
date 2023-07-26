import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@root/prisma/prisma.service";

import { ProductEntity } from "@product/entity/product.entity";
import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";
import { PRODUCT_REPOSITORY } from "@product/repository/product.repository";
import { AddProductCommand } from "@product/service/dto/add-product.command";
import { ProductService } from "@product/service/product.service";
import { AddProduct } from "@product/usecase/add-product/add-product";
import { GetAllProducts } from "@product/usecase/get-all-products/get-all-products";

jest.mock("@product/usecase/add-product/add-product");
jest.mock("@product/usecase/get-all-products/get-all-products", () => ({
  GetAllProducts: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue([]), // 테스트에서 원하는 값을 반환하도록 설정
  })),
}));
jest.mock("@product/repository/product.repository");

describe("ProductService", () => {
  let service: ProductService;
  let addProductUseCase: AddProduct;
  let getAllProductsUseCase: GetAllProducts;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PRODUCT_REPOSITORY,
          useClass: ProductPrismaRepository,
        },
        PrismaService,
        ProductService,
        AddProduct,
        GetAllProducts,
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    addProductUseCase = module.get<AddProduct>(AddProduct);
    getAllProductsUseCase = module.get<GetAllProducts>(GetAllProducts);
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

  describe("getAllProducts", () => {
    it("전체 조회 하는가?", async () => {
      const allProducts = await service.getAllProducts();
      expect(allProducts).toStrictEqual([]);
    });
  });
});
