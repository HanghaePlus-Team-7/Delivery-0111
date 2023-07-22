import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@root/prisma/prisma.service";

import { CartRepository } from "@cart/cart.repository";

describe("Cart", () => {
  let cartRepository: CartRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartRepository, PrismaService],
    }).compile();

    cartRepository = module.get<CartRepository>(CartRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it.todo("cart test");
});
