import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@root/prisma/prisma.service";

import { OrderStatus } from "@orders/entities/order-status";
import { OrdersEntity } from "@orders/entities/orders.entity";

import { OrdersRepository } from "./orders.repository";

describe("Orders", () => {
  let ordersRepository: OrdersRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersRepository, PrismaService],
    }).compile();

    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("ordersRepository.updateOrderStatus 실행하면 prismaService.order.update가 status를 OrderStatus.CONFIRMED로 바꿈?", async () => {
    const ordersEntity = OrdersEntity.forConfirmOrder(1n);

    prismaService.order.update = jest.fn();

    await ordersRepository.updateOrderStatus(ordersEntity);
    expect(prismaService.order.update).toBeCalledTimes(1);
    expect(prismaService.order.update).toBeCalledWith({
      data: {
        status: OrderStatus.CONFIRMED,
      },
      where: {
        id: ordersEntity.id,
      },
    });
  });
});