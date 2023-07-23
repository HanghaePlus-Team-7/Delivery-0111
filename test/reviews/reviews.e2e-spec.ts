import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "@root/app.module";
import { setNestApp } from "@root/libs/common/set-nest-app";

describe("reviews (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setNestApp(app);
    await app.init();
  });
  it.todo("리뷰 작성에 성공하면 201 응답을 보낸다");
});
