import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import * as request from "supertest";

import { AppModule } from "@root/app.module";
import { PrismaService } from "@root/prisma/prisma.service";

describe("주문 매장 (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

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

  describe("주문 확정", () => {
    let order: { id: bigint };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      order = { id: 1n };
    });

    it("주문 확정 성공하면 201 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).patch(`/orders/${order.id}/confirmation`);
      expect(res.status).toBe(201);
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
