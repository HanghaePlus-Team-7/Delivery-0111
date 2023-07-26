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
      const photoPath = "test-photo-path";

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

      await productPrismaRepository.addProduct({
        id,
        storeId,
        name,
        price,
        description,
        image: photoPath,
      });

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
      expect(product.image).toBe(photoPath);
      expect(product.inStock).toBe(true);
    });
  });

  describe("getAllProducts", () => {
    it("메뉴 전체 조회", async () => {
      const storeId = uuidV4();

      const menuData1 = {
        id: uuidV4(),
        name: "menu1",
        price: 5000,
        description: "menu1-description",
        photoPath: "menu1-photo-path",
        inStock: true,
      };

      const menuData2 = {
        id: uuidV4(),
        name: "menu2",
        price: 10000,
        description: "menu2-description",
        photoPath: "menu2-photo-path",
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

      // menu 생성
      const product1 = await prismaService.product.create({
        data: {
          id: menuData1.id,
          storeId,
          name: menuData1.name,
          price: menuData1.price,
          description: menuData1.description,
          image: menuData1.photoPath,
          inStock: menuData1.inStock,
        },
      });

      const product2 = await prismaService.product.create({
        data: {
          id: menuData2.id,
          storeId,
          name: menuData2.name,
          price: menuData2.price,
          description: menuData2.description,
          image: menuData2.photoPath,
          inStock: menuData2.inStock,
        },
      });

      // usecase 실행
      const allProducts: ProductEntity[] = await productPrismaRepository.getAllProducts();

      expect(allProducts.length).toBe(2);
      // expect();
    });
  });
});
