import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { AppModule } from "@root/app.module";

describe("주문 고객 (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("create-order 주문 요청", () => {
    let orders: { id: string; userId: string };

    beforeEach(async () => {
      orders = { id: uuidV4(), userId: uuidV4() };
    });

    it.todo("주문 요청에 성공하면 201 응답을 보낸다");
    // it("주문 요청에 성공하면 201 응답을 보낸다", async () => {
    //   const res = await request(app.getHttpServer()).post(`/orders/${orders.id}`);
    //   expect(res.status).toBe(201);
    // });
  });

  describe("get-all-orders 주문 전체 조회", () => {
    // let orders: { id: string; userId: string };
    let user: { id: string };

    beforeEach(async () => {
      // orders = { id: uuidV4(, userId: uuidV4( };
      user = { id: uuidV4() };
    });

    it.todo("유저의 주문 전체 조회에 성공하면 200 응답을 보낸다");
    // it("유저의 주문 전체 조회에 성공하면 200 응답을 보낸다", async () => {
    //   const res = await request(app.getHttpServer()).get(`/orders/users/${user.id}`);
    //   expect(res.status).toBe(200);
    // });

    it("존재하지 않는 유저의 아이디로 주문 전체 조회하면 404 응답을 보낸다", async () => {
      user = { id: uuidV4() };

      const res = await request(app.getHttpServer()).get(`/orders/users/${user.id}`);
      expect(res.status).toBe(404);
    });
  });

  describe("get-one-order 주문 상세 조회", () => {
    let orders: { id: string; userId: string };

    beforeEach(async () => {
      orders = { id: uuidV4(), userId: uuidV4() };
    });

    it.todo("유저의 주문 상세 조회에 성공하면 200 응답을 보낸다");
    // it("유저의 주문 상세 조회에 성공하면 200 응답을 보낸다", async () => {
    //   const res = await request(app.getHttpServer()).get(`/orders/${orders.id}`);
    //   expect(res.status).toBe(200);
    // });

    it("유저의 주문 내역 중 존재하지 않는 주문의 아이디로 주문 상세 조회하면 404 응답을 보낸다", async () => {
      orders = { id: uuidV4(), userId: uuidV4() };

      const res = await request(app.getHttpServer()).get(`/orders/${orders.id}`);
      expect(res.status).toBe(404);
    });
  });

  // describe("주문 취소", () => {});
  describe("delete-order 주문 내역 삭제", () => {
    let orders: { id: string; userId: string };

    beforeEach(async () => {
      orders = { id: uuidV4(), userId: uuidV4() };
    });

    it.todo("주문 내역 삭제에 성공하면 204 응답을 보낸다");
    // it("주문 내역 삭제에 성공하면 204 응답을 보낸다", async () => {
    //   const res = await request(app.getHttpServer()).delete(`/orders/${orders.id}`);
    //   expect(res.status).toBe(204);
    // });

    it("이미 삭제된 주문 혹은 존재하지 않은 주문 아이디로 주문 삭제를 하면 404 응답을 보낸다", async () => {
      orders = { id: uuidV4(), userId: uuidV4() };

      const res = await request(app.getHttpServer()).delete(`/orders/${orders.id}`);
      expect(res.status).toBe(404);
    });
  });
});
