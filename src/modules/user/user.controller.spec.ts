import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@root/prisma/prisma.service";

import { CreateUserDto } from "./dto/request/create-user.dto";
import { CreateUserService } from "./service/create-user/create-user.service";
import { UserController } from "./user.controller";

jest.mock("./service/create-user/create-user.service");
jest.mock("./user.controller");

describe("UserController", () => {
  let controller: UserController;
  let createUserService: CreateUserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue({
                // 'create' 메서드를 모의합니다.
                id: "1",
                email: "test@example.com",
                password: "password",
                nickname: "test",
                phone: "01012341234",
                address: "서울시 강남구",
                createdAt: new Date(),
                updatedAt: new Date(),
              }),
              findUnique: jest.fn().mockResolvedValue(null),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserService = module.get<CreateUserService>(CreateUserService);
    prismaService = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe("유저", () => {
    it("유저 회원가입을 실행하나?", async () => {
      const userForm = CreateUserDto.of({
        nickname: "test",
        email: "asdfAasdaSD421asdl@gmail.com",
        password: "asdf1234!@#",
        phone: "01012341234",
        address: "서울시 강남구",
      });

      const result = await controller.createUser(userForm);
      console.log("result", result);
      expect(result).toEqual(userForm);

      //   expect(prismaService.user.create).toBeCalledTimes(1); // PrismaService의 'create' 메서드가 호출되었는지 확인합니다.
      //   expect(prismaService.user.create).toBeCalledWith({
      //     data: {
      //       ...userForm,
      //     },
      //   }); // 'create' 메서드가 올바른 인자로 호출되었는지 확인합니다.
    });
  });
});
