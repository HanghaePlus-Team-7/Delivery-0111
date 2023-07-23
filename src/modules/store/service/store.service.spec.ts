import { Test, TestingModule } from "@nestjs/testing";

import { StoreRepository } from "@store/store.repository";

import { StoreService } from "./store.service";

jest.mock("@store/store.repository");
describe("StoreService", () => {
  let service: StoreService;
  let repository: StoreRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService, StoreRepository],
    }).compile();

    service = module.get<StoreService>(StoreService);
    repository = module.get<StoreRepository>(StoreRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
