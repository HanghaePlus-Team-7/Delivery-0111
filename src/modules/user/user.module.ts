import { Module } from "@nestjs/common";

import { UserService } from "./service/user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRepository } from "./user.repository";
import { CREATE_USER } from "./service/create-user/create-user.interface";
import { CreateUserService } from "./service/create-user/create-user.service";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: CREATE_USER,
      useClass: CreateUserService,
    },
    PrismaService,
    UserRepository,
  ],
})
export class UserModule {}
