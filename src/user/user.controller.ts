import { Body, Controller, Get, Post, Param, Delete, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { SignupUserService } from "./service/signup-user-service";
import { User } from "./service/signup-user.interface";
import { SignupUserDto } from "./dto/signup-user.dto";
import { UserEntity } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(private signupUserService: SignupUserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  signupUser(@Body() signupUserDto: SignupUserDto): UserEntity {
    return this.signupUserService.signupUser(signupUserDto);
  }
}
