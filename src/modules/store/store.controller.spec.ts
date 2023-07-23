import { Test, TestingModule } from "@nestjs/testing";

import { StoreService } from "@store/service/store.service";

import { StoreController } from "./store.controller";

jest.mock("@store/service/store.service");

describe("StoreController", () => {
  let controller: StoreController;
  let service: StoreService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService],
    }).compile();

    controller = module.get<StoreController>(StoreController);
    service = module.get<StoreService>(StoreService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
