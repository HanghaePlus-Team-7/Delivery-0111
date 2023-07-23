import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidV4 } from "uuid";

import { PrismaModule } from "@root/prisma/prisma.module";
import { PrismaService } from "@root/prisma/prisma.service";

import { ProductPrismaRepository } from "@product/repository/product.prisma-repository";

import { truncateTable } from "../../../../test/truncate-table";

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
});
