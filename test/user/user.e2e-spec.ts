import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import * as request from "supertest";

import { AppModule } from "../../src/app.module";
import { log } from "console";

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
        email: "asd",
        password: "asdasd",
      };
    });

    it("회원가입에 성공하면 201 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).post("/user").send(user);
      expect(res.status).toBe(201);
      console.log(res.body.message);
    });
  });

  describe("유저 삭제", () => {
    let id: { id: string };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      id = {
        id: "sample-id",
      };
    });

    it("유저 삭제에 성공하면 200 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).delete("/user").send(id);
      expect(res.status).toBe(200);
      console.log(res.body.message);
    });

    it("유저 삭제에 실패하면 400 응답을 보내나?", async () => {
      const invalidId = { id: "non-existing-id" }; // 존재하지 않는 ID를 사용하여 삭제 요청을 실패하게 만듭니다.
      const res = await request(app.getHttpServer()).delete("/user").send(invalidId);
      expect(res.status).toBe(404);
      console.log(res.body.message);
    });
  });
});
