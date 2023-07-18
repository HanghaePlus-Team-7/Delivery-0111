import { Module } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";

import { CREATE_USER } from "./service/create-user/create-user.interface";
import { CreateUserService } from "./service/create-user/create-user.service";
import { UserService } from "./service/user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";

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
