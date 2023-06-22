import { Test, TestingModule } from "@nestjs/testing";
import { ConfirmOrderService } from "./confirm-order.service";

describe("ConfirmOrder", () => {
  let provider: ConfirmOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmOrderService],
    }).compile();

    provider = module.get<ConfirmOrderService>(ConfirmOrderService);
  });

  it("should be defined", () => {
    expect(provider).toBeDefined();
  });
});
