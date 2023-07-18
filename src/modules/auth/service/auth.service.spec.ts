import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthRepository } from "../auth.repository";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let authRepository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useClass: AuthService,
        },
        AuthRepository,
      ],
    }).compile();
    authRepository = module.get<AuthRepository>(AuthRepository);
    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
