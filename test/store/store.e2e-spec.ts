import { log } from "console";

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import * as request from "supertest";

import { AppModule } from "../../src/app.module";

describe("store (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("매장 회원가입", () => {
    let store: {
      email: string;
      password: string;
      name: string;
      telephone: string;
      address: string;
      openHour: Date;
      closeHour: Date;
    };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      store = {
        email: "sfsdas123221212f@gmail.com",
        password: "asdf1324@",
        name: "asd",
        telephone: "asd",
        address: "asd",
        openHour: new Date(),
        closeHour: new Date(),
      };
    });

    it("매장 회원가입에 성공하면 201 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).post("/store").send(store);
      expect(res.status).toBe(201);
    });
  });

  describe("매장 전체 목록", () => {
    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
    });

    it("매장목록이 정상적으로 리턴하면 200 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).get("/store");
      log(res.body);
      expect(res.status).toBe(200);
    });
  });
});
