import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { Order, PrismaClient } from "@prisma/client";
import * as request from "supertest";

import { AppModule } from "@root/app.module";
import { PrismaService } from "@root/prisma/prisma.service";

import { OrderStatus } from "@orders/entities/order-status";

const prisma = new PrismaClient();
describe("주문 매장 (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let order: Order;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        email: "test-email@email.com",
        password: "test-password",
        nickname: "test-nickname",
        phone: "01012345678",
        address: "test-address",
      },
    });

    await prisma.store.create({
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

    await prisma.product.create({
      data: {
        name: "test-product-name",
        code: "test-product-code",
        price: 1000,
        storeId: 1n,
      },
    });

    order = await prisma.order.create({
      data: {
        userId: 1n,
        storeId: 1n,
        OrderSheet: {
          create: {
            productId: 1n,
            amount: 1,
          },
        },
        paymentType: "CARD",
        paidAt: new Date(),
        paymentStatus: "PAID",
        status: OrderStatus.RECEPTION,
      },
    });
  });
  describe("주문 확정", () => {
    it("주문 확정 성공하면 200 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).patch(`/orders/${order.id}/confirmation`);
      expect(res.status).toBe(200);
    });

    it("주문 확정 성공하면 DB에서 상태가 'CONFIRMED'로 바뀌나?", async () => {
      await request(app.getHttpServer()).patch(`/orders/${order.id}/confirmation`);
      const result = await prisma.order.findUnique({
        select: {
          status: true,
        },
        where: {
          id: order.id,
        },
      });
      expect(result?.status).toBe(OrderStatus.CONFIRMED);
    });
  });

  describe("주문 전체 조회", () => {
    // TODO: 로그인 구현 후 토큰에서 매장 아이디 가져오기 url 변경 필요
    let store: { id: bigint };

    beforeEach(async () => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      store = { id: 1n };
    });

    it("주문 조회 성공하면 200 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).get(`/orders/stores/${store.id}`);
      expect(res.status).toBe(200);
    });
  });

  describe("주문 상세 조회", () => {
    let orders: { id: bigint };

    beforeEach(async () => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      orders = { id: 1n };
    });

    it("주문 상세 조회 성공하면 200 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).get(`/orders/${orders.id}`);
      expect(res.status).toBe(200);
    });

    it("주문 상세 조회 없는 주문 아이디로 조회하면 404 응답을 보내나?", async () => {
      orders = { id: -1n };

      const res = await request(app.getHttpServer()).get(`/orders/${orders.id}`);
      expect(res.status).toBe(404);
    });

    it.todo("자신의 매장의 주문이 아닌 id로 조회하면 403 응답을 보내나? 로그인 생기고 나서 구현");
  });

  describe("주문 취소", () => {
    let orders: { id: bigint };

    beforeEach(async () => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      orders = { id: 1n };
    });

    it("주문 취소 성공하면 200 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).patch(`/orders/${orders.id}`);
      expect(res.status).toBe(200);
    });
  });
});
