import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { Store } from "@prisma/client";
import request from "supertest";

import { AppModule } from "@root/app.module";
import { setNestApp } from "@root/common/set-nest-app";
import { PrismaService } from "@root/prisma/prisma.service";

import { truncateTable } from "../truncate-table";

describe("products (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let store: Store;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setNestApp(app);
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await truncateTable(prismaService);
    store = await prismaService.store.create({
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
  });

  describe("메뉴추가", () => {
    let menuData: { name: string; price: number; description: string; photo: string; storeId: bigint };

    beforeEach(() => {
      menuData = {
        name: "test-menu-name",
        price: 10000,
        description: "test-menu-description",
        photo: `${__dirname}/../data/menu-test-img/test-menu-photo.png`,
        storeId: store.id,
      };
    });

    it("메뉴 추가 요청 성공하면 201 응답이 오나?", async () => {
      const res = await request(app.getHttpServer())
        .post("/products")
        .set("Content-Type", "multipart/form-data")
        .attach("photo", menuData.photo)
        .field("name", menuData.name)
        .field("price", menuData.price)
        .field("description", menuData.description)
        .field("storeId", menuData.storeId.toString());

      expect(res.statusCode).toBe(201);
    });
  });

  describe("메뉴 조회", () => {
    it.todo("메뉴 조회 잘됨?");
  });

  describe("메뉴 수정", () => {
    it.todo("메뉴 수정 잘됨?");
  });
});
