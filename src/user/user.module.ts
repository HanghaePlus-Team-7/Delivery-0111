import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { SignupUserService } from "./service/signup-user-service";

@Module({
  controllers: [UserController],
  providers: [SignupUserService],
})
export class UserModule {}
