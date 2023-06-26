import { Test, TestingModule } from "@nestjs/testing";
import { AddBasketService } from "./add-basket.service";

describe("AddBasketService", () => {
  let service: AddBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddBasketService],
    }).compile();

    service = module.get<AddBasketService>(AddBasketService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
