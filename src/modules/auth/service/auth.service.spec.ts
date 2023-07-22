import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthRepository } from "../auth.repository";

import { AuthService } from "./auth.service";

jest.mock("../auth.repository");

describe("AuthService", () => {
  let service: AuthService;
  let jwtService: JwtService;
  let authRepository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, AuthRepository],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
    jwtService = module.get<JwtService>(JwtService);
    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
