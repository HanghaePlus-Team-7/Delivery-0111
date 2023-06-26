import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import * as request from "supertest";

import { AppModule } from "../../src/app.module";

describe("user (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("유저 회원가입", () => {
    let user: { email: string; password: string };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      user = {
        email: "",
        password: "",
      };
    });

    it("회원가입에 성공하면 201 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).post("/user").send(user);
      expect(res.status).toBe(201);
    });
  });
});
