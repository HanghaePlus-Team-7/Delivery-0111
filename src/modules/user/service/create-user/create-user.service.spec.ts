import { Test, TestingModule } from "@nestjs/testing";

import { CreateUserDto } from "../../dto/request/create-user.dto";
import { UserRepository } from "../../user.repository";

import { CREATE_USER } from "./create-user.interface";
import { CreateUserService } from "./create-user.service";

jest.mock("@user/user.repository");

describe("CreateUser", () => {
  let creaUserService: CreateUserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CREATE_USER,
          useClass: CreateUserService,
        },
        UserRepository,
      ],
    }).compile();

    creaUserService = module.get<CreateUserService>(CREATE_USER);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it("CreateUser 인자로 createUserService.execute를 실행하면 mockCreateUserDto.toEntity()를 인자로 createUser 실행하나?", async () => {
    const mockCreateUserDto = CreateUserDto.of({
      nickname: "test",
      email: "asdf1231421asdl@gmail.com",
      password: "asdf1234!@#",
      phone: "01012341234",
      address: "서울시 강남구",
    });

    const res = await creaUserService.execute(mockCreateUserDto);
    console.log("res ---------------", res);

    expect(res).not.toBe(undefined);
    // expect(res).toBe(201);
    // expect(userRepository.createUser(mockCreateUserDto)).toBeCalledTimes(1);
    expect(userRepository.createUser(mockCreateUserDto)).toBe(undefined);
    expect(userRepository.createUser(mockCreateUserDto)).toBeCalledWith(mockCreateUserDto.toEntity());
  });
});
