import { Test, TestingModule } from "@nestjs/testing";

import { AuthService } from "@auth/service/auth.service";

import { AuthController } from "./auth.controller";

jest.mock("@auth/service/auth.service");

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
