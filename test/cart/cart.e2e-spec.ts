import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { AppModule } from "@root/app.module";
import { setNestApp } from "@root/libs/common/set-nest-app";

describe("장바구니 (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  describe("add-cart 장바구니 추가", () => {
    let cart: { id: string; userId: string; productId: string; amount: number };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      cart = { id: uuidV4(), userId: uuidV4(), productId: uuidV4(), amount: 5 };
    });

    it("장바구니 추가에 성공하면 201 응답을 보낸다", async () => {
      const res = await request(app.getHttpServer()).post(`/cart`).send(cart);
      expect(res.status).toBe(201);
    });
  });

  describe("get-cart 장바구니 조회", () => {
    let cart: { id: string; userId: string; productId: string; amount: number }[];

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      cart = [
        { id: uuidV4(), userId: uuidV4(), productId: uuidV4(), amount: 5 },
        { id: uuidV4(), userId: uuidV4(), productId: uuidV4(), amount: 1 },
        { id: uuidV4(), userId: uuidV4(), productId: uuidV4(), amount: 3 },
      ];
    });

    it("장바구니 조회를 성공하면 200 응답을 보낸다", async () => {
      const res = await request(app.getHttpServer()).get(`/cart`);
      expect(res.status).toBe(200);
    });
  });

  describe("delete-cart 장바구니 빼기", () => {
    let cart: { id: string; userId: string; productId: string; amount: number };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      cart = { id: uuidV4(), userId: uuidV4(), productId: uuidV4(), amount: 5 };
    });

    it("장바구니 빼기를 성공하면 200 응답을 보낸다", async () => {
      const res = await request(app.getHttpServer()).get(`/cart`);
      expect(res.status).toBe(204);
    });
  });
});
