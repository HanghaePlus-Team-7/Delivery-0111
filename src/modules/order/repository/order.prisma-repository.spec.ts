import { Test, TestingModule } from "@nestjs/testing";

import { Order, Product, Store, User } from "@prisma/client";

import { PrismaModule } from "@root/prisma/prisma.module";
import { PrismaService } from "@root/prisma/prisma.service";

import { OrderStatus } from "@order/entity/order-status";
import { OrderPrismaRepository } from "@order/repository/order.prisma-repository";
import { ORDERS_REPOSITORY, OrderRepository } from "@order/repository/order.repository";

import { truncateTable } from "../../../../test/truncate-table";

describe("Orders", () => {
  let ordersRepository: OrderRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        {
          provide: ORDERS_REPOSITORY,
          useClass: OrderPrismaRepository,
        },
      ],
    }).compile();

    ordersRepository = module.get<OrderRepository>(ORDERS_REPOSITORY);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe("Orders", () => {
    let user: User;
    let order: Order;
    let store: Store;
    let product: Product;

    beforeEach(async () => {
      user = await prismaService.user.create({
        data: {
          email: "test-email@email.com",
          password: "test-password",
          nickname: "test-nickname",
          phone: "01012345678",
          address: "test-address",
        },
      });

      store = await prismaService.store.create({
        data: {
          email: "test-store-email@email.com",
          password: "test-store-password",
          name: "test-store-name",
          address: "test-store-address",
          telephone: "01012345678",
          openHour: new Date(),
          closeHour: new Date(),
        },
      });

      product = await prismaService.product.create({
        data: {
          name: "test-product-name",
          code: "test-product-code",
          price: 1000,
          storeId: store.id,
        },
      });
    });

    afterEach(async () => {
      await truncateTable(prismaService);
    });

    it("ordersRepository.updateOrderStatus 실행하면 prismaService.order.update가 status를 OrderStatus.CONFIRMED로 바꿈?", async () => {
      order = await prismaService.order.create({
        data: {
          userId: user.id,
          storeId: store.id,
          OrderSheet: {
            create: {
              productId: product.id,
              amount: 1,
            },
          },
          paymentType: "CARD",
          paidAt: new Date(),
          paymentStatus: "PAID",
          status: OrderStatus.RECEPTION,
        },
      });

      const confirmedOrderAt = new Date(2023, 6, 19, 12, 30, 30);
      const id = order.id;
      await ordersRepository.updateOrderStatus(id, OrderStatus.CONFIRMED, confirmedOrderAt);

      const result = await prismaService.order.findUnique({
        where: {
          id,
        },
        select: {
          status: true,
          confirmedOrderAt: true,
        },
      });

      expect(result?.status).toBe(OrderStatus.CONFIRMED);
      expect(result?.confirmedOrderAt).toEqual(confirmedOrderAt);
    });
  });
});
