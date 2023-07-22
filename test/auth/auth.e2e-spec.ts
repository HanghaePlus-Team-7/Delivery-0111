import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from "jsonwebtoken";
import request from "supertest";

import { AppModule } from "@root/app.module";
import { setNestApp } from "@root/libs/common/set-nest-app";
import authConfig from "@root/modules/auth/auth.config";

describe("auth (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  describe("인증 로그인", () => {
    let user: { email: string; password: string };

    beforeEach(() => {
      // TODO: 제대로 된 샘플 데이터로 변경 필요
      user = {
        email: "fsd76005588@gmail.com",
        password: "asdf1324@",
      };
    });

    it("로그인에 성공하면 200 응답을 보내나?", async () => {
      const res = await request(app.getHttpServer()).post("/auth/login").send(user);
      expect(res.status).toBe(200);
    });

    it("로그인에 성공하면 정상적인 토큰을 보내나?", async () => {
      const res = await request(app.getHttpServer()).post("/auth/login").send(user);
      expect(res.status).toBe(200);
      const token = res.body.token;
      verify(
        token,
        authConfig.jwt.secretOrKey,
        (err: JsonWebTokenError | NotBeforeError | TokenExpiredError | null, decoded: any) => {
          expect(err).toBeNull();
          expect(decoded.email).toBe(user.email);
        },
      );
    });
  });
});
