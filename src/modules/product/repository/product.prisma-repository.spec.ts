import { Test, TestingModule } from "@nestjs/testing";

import { ProductPrismaRepository } from "./product.prisma-repository";

describe("Repository", () => {
  let provider: ProductPrismaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPrismaRepository],
    }).compile();

    provider = module.get<ProductPrismaRepository>(ProductPrismaRepository);
  });

  it("should be defined", () => {
    expect(provider).toBeDefined();
  });
});
