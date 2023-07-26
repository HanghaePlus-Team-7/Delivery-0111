import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidV4 } from "uuid";

import { PrismaModule } from "@root/prisma/prisma.module";
import { PrismaService } from "@root/prisma/prisma.service";

import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";

import { truncateTable } from "../../../../test/truncate-table";
import { ProductEntity } from "../entity/product.entity";

describe("Repository", () => {
  let productPrismaRepository: ProductPrismaRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProductPrismaRepository],
    }).compile();

    productPrismaRepository = module.get<ProductPrismaRepository>(ProductPrismaRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await truncateTable(prismaService);
  });

  describe("addProduct", () => {
    beforeEach(async () => {
      await truncateTable(prismaService);
    });
    it("저장 잘 하나?", async () => {
      const id = uuidV4();
      const storeId = uuidV4();
      const name = "test-name";
      const price = 1000;
      const description = "test-description";
      const image = "test-image-path";

      await prismaService.store.create({
        data: {
          id: storeId,
          email: "test-email",
          password: "test-password",
          name: "test-name",
          address: "test-address",
          telephone: "01012345678",
          openHour: new Date(),
          closeHour: new Date(),
        },
      });

      const productEntity = new ProductEntity({
        id,
        storeId,
        name,
        price,
        description,
        image,
      });
      await productPrismaRepository.addProduct(productEntity);

      const product = await prismaService.product.findUnique({
        where: {
          id,
        },
      });

      if (!product) {
        throw new Error("product is null");
      }
      expect(product.id).toBe(id);
      expect(product.storeId).toBe(storeId);
      expect(product.name).toBe(name);
      expect(product.price).toBe(price);
      expect(product.description).toBe(description);
      expect(product.image).toBe(image);
      expect(product.inStock).toBe(true);
    });
  });

  describe("getAllProducts", () => {
    beforeEach(async () => {
      await truncateTable(prismaService);
    });
    it("상품 전체 조회", async () => {
      const storeId = uuidV4();

      const productData1 = {
        id: uuidV4(),
        name: "product1",
        price: 5000,
        description: "product1-description",
        image: "product1-image-path",
        inStock: true,
      };

      const productData2 = {
        id: uuidV4(),
        name: "product2",
        price: 10000,
        description: "product2-description",
        image: "product2-image-path",
        inStock: true,
      };

      // 매장 생성
      await prismaService.store.create({
        data: {
          id: storeId,
          email: "test-email",
          password: "test-password",
          name: "test-name",
          address: "test-address",
          telephone: "01012345678",
          openHour: new Date(),
          closeHour: new Date(),
        },
      });

      // 상품 생성
      await prismaService.product.create({
        data: {
          id: productData1.id,
          storeId,
          name: productData1.name,
          price: productData1.price,
          description: productData1.description,
          image: productData1.image,
          inStock: productData1.inStock,
        },
      });

      await prismaService.product.create({
        data: {
          id: productData2.id,
          storeId,
          name: productData2.name,
          price: productData2.price,
          description: productData2.description,
          image: productData2.image,
          inStock: productData2.inStock,
        },
      });

      // usecase 실행
      const allProducts: ProductEntity[] = await productPrismaRepository.getAllProducts();

      expect(allProducts.length).toBe(2);

      expect(allProducts[0].name).toBe(productData1.name);
      expect(allProducts[0].price).toBe(productData1.price);
      expect(allProducts[0].description).toBe(productData1.description);
      expect(allProducts[0].image).toBe(productData1.image);

      expect(allProducts[1].name).toBe(productData2.name);
      expect(allProducts[1].price).toBe(productData2.price);
      expect(allProducts[1].description).toBe(productData2.description);
      expect(allProducts[1].image).toBe(productData2.image);
    });
  });
});
