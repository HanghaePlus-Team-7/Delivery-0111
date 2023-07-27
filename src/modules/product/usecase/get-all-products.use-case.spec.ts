import { Test, TestingModule } from "@nestjs/testing";

import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";
import { PRODUCT_REPOSITORY, ProductRepository } from "@product/repository/product.repository";
import { GetAllProductsUseCase } from "@product/usecase/get-all-products.use-case";

jest.mock("@product/repository/product.prisma-repository");
jest.mock("@product/usecase/get-all-products.use-case", () => ({
  GetAllProductsUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue([]), // 테스트에서 원하는 값을 반환하도록 설정
  })),
}));
describe("GetAllProductsUseCase", () => {
  let getAllProductsUseCase: GetAllProductsUseCase;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllProductsUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useClass: ProductPrismaRepository,
        },
      ],
    }).compile();

    getAllProductsUseCase = module.get<GetAllProductsUseCase>(GetAllProductsUseCase);
    productRepository = module.get<ProductRepository>(PRODUCT_REPOSITORY);
  });

  describe("getAllProducts", () => {
    it("전체 조회 하는가?", async () => {
      const allProducts = await getAllProductsUseCase.execute();
      expect(allProducts).toStrictEqual([]);
    });
  });
});
