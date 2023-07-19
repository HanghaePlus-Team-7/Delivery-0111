import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { Order, PrismaClient, Product, Store, User } from "@prisma/client";
import request from "supertest";

import { AppModule } from "@root/app.module";
import { setNestApp } from "@root/common/set-nest-app";
import { PrismaService } from "@root/prisma/prisma.service";

import { OrderStatus } from "@orders/entities/order-status";

import { truncateTable } from "../truncate-table";

const prisma = new PrismaClient();
describe("주문 매장 (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let user: User;
  let order: Order;
  let store: Store;
  let product: Product;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setNestApp(app);

    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await truncateTable(prisma);
  });

  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        email: "test-email@email.com",
        password: "test-password",
        nickname: "test-nickname",
        phone: "01012345678",
        address: "test-address",
      },
    });

    store = await prisma.store.create({
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

    product = await prisma.product.create({
      data: {
        name: "test-product-name",
        code: "test-product-code",
        price: 1000,
        storeId: store.id,
      },
    });
  });

  describe("주문 확정", () => {
    beforeEach(async () => {
      order = await prisma.order.create({
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
    });

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

    it("주문 확정 성공하면 DB에서 주문확정 시간이 생성되나??", async () => {
      await request(app.getHttpServer()).patch(`/orders/${order.id}/confirmation`);
      const result = await prisma.order.findUnique({
        select: {
          confirmedOrderAt: true,
        },
        where: {
          id: order.id,
        },
      });
      expect(result).toHaveProperty("confirmedOrderAt");
    });
  });

  describe("주문 전체 조회", () => {
    beforeEach(async () => {
      order = await prisma.order.create({
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
    });

    it("주문 조회 성공하면 200 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).get(`/orders/stores/${store.id}`);
      expect(res.status).toBe(200);
    });

    it("주문 조회 성공하면 응답 데이터를 보내나?", async () => {
      const res = await request(app.getHttpServer()).get(`/orders/stores/${store.id}`);

      expect(res.body).toStrictEqual([
        {
          user: {
            id: user.id.toString(),
            email: user.email,
            nickname: user.nickname,
            phone: user.phone,
            address: user.address,
          },
          store: {
            id: store.id.toString(),
            email: store.email,
            name: store.name,
          },
          OrderSheet: [
            {
              amount: 1,
              product: {
                id: product.id.toString(),
                name: product.name,
                price: product.price,
              },
            },
          ],
          id: order.id.toString(),
          paymentType: "CARD",
          paymentStatus: "PAID",
          status: OrderStatus.RECEPTION,
        },
      ]);
    });
  });

  describe("주문 상세 조회", () => {
    let orders: { id: bigint };

    beforeEach(async () => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      orders = { id: 1n };
    });

    it.todo("주문 상세 조회 성공하면 200 응답을 보내나?");

    // it("주문 상세 조회 성공하면 200 응답을 보내나?", async () => {
    //   const res = await request(app.getHttpServer()).get(`/orders/${orders.id}`);
    //   expect(res.status).toBe(200);
    // });

    it.todo("주문 상세 조회 없는 주문 아이디로 조회하면 404 응답을 보내나?");
    // it("주문 상세 조회 없는 주문 아이디로 조회하면 404 응답을 보내나?", async () => {
    //   orders = { id: -1n };
    //
    //   const res = await request(app.getHttpServer()).get(`/orders/${orders.id}`);
    //   expect(res.status).toBe(404);
    // });

    it.todo("자신의 매장의 주문이 아닌 id로 조회하면 403 응답을 보내나? 로그인 생기고 나서 구현");
  });

  describe("주문 취소", () => {
    let orders: { id: bigint };

    beforeEach(async () => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      orders = { id: 1n };
    });

    it.todo("주문 취소 성공하면 200 응답을 보내나?");
    // it("주문 취소 성공하면 200 응답을 보내나?", async () => {
    //   const res = await request(app.getHttpServer()).patch(`/orders/${orders.id}`);
    //   expect(res.status).toBe(200);
    // });
  });
});
