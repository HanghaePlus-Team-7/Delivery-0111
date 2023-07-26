import * as fs from "fs";
import process from "process";

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { Store } from "@prisma/client";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { AppModule } from "@root/app.module";
import { setNestApp } from "@root/libs/common/set-nest-app";
import { isExistFile } from "@root/libs/utils/is-exist-file";
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
        id: uuidV4(),
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

  afterEach(async () => {
    await truncateTable(prismaService);
    await app.close();
  });

  describe("상품 추가", () => {
    let productData: { name: string; price: number; description: string; photo: string; storeId: string };
    const filePath = process.env.UPLOAD_FILE_PATH || "../test/data/uploads";
    const fileName = process.env.UPLOAD_FILE_NAME || "test.png";
    const path = `${filePath}/${fileName}`;

    beforeEach(() => {
      productData = {
        name: "test-product-name",
        price: 10000,
        description: "test-product-description",
        photo: `${__dirname}/../data/product-test-img/test-product-photo.png`,
        storeId: store.id,
      };
    });

    afterEach(() => {
      fs.unlinkSync(path);
    });

    it("상품 추가 요청이 성공하면 201 응답이 와야 한다.", async () => {
      const res = await request(app.getHttpServer())
        .post("/products")
        .set("Content-Type", "multipart/form-data")
        .attach("photo", productData.photo)
        .field("name", productData.name)
        .field("price", productData.price)
        .field("description", productData.description)
        .field("storeId", productData.storeId);

      expect(res.statusCode).toBe(201);
    });

    it("상품 추가 요청 multer로 파일 저장할 수 있어야 한다.", async () => {
      await request(app.getHttpServer())
        .post("/products")
        .set("Content-Type", "multipart/form-data")
        .attach("photo", productData.photo)
        .field("name", productData.name)
        .field("price", productData.price)
        .field("description", productData.description)
        .field("storeId", productData.storeId);

      expect(isExistFile(path)).toBe(true);
    });
  });

  describe("상품 전체 조회", () => {
    it("상품 전체 조회 시 200 응답을 반환하는가?", async () => {
      const res = await request(app.getHttpServer()).get("/products");
      expect(res.statusCode).toBe(200);
    });
  });

  describe("상품 수정", () => {
    it("상품 수정 시 201 응답을 반환하는가?", async () => {});
  });
});
