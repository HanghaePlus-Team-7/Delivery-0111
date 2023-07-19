import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import request from "supertest";

import { AppModule } from "@root/app.module";

describe("장바구니 (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("add-cart 장바구니 추가", () => {
    let cart: { id: bigint; userId: bigint; productId: bigint; amount: number };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      cart = { id: 1n, userId: 2n, productId: 3n, amount: 5 };
    });

    it("장바구니 추가에 성공하면 201 응답을 보낸다", async () => {
      const res = await request(app.getHttpServer()).post(`/cart`);
      expect(res.status).toBe(201);
    });
  });

  describe("get-cart 장바구니 조회", () => {
    let cart: { id: bigint; userId: bigint; productId: bigint; amount: number }[];

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      cart = [
        { id: 1n, userId: 2n, productId: 3n, amount: 5 },
        { id: 2n, userId: 3n, productId: 1n, amount: 1 },
        { id: 3n, userId: 1n, productId: 2n, amount: 3 },
      ];
    });

    it("장바구니 조회를 성공하면 200 응답을 보낸다", async () => {
      const res = await request(app.getHttpServer()).get(`/cart`);
      expect(res.status).toBe(200);
    });
  });

  describe("delete-cart 장바구니 빼기", () => {
    let cart: { id: bigint; userId: bigint; productId: bigint; amount: number };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      cart = { id: 1n, userId: 2n, productId: 3n, amount: 5 };
    });

    it("장바구니 빼기를 성공하면 200 응답을 보낸다", async () => {
      const res = await request(app.getHttpServer()).get(`/cart`);
      expect(res.status).toBe(204);
    });
  });
});
