import { Body, Controller, Post, Param, Delete, UsePipes, ValidationPipe, Get, Inject } from "@nestjs/common";

import { CreateUserDto } from "./dto/request/create-user.dto";
import { UserService } from "./service/user.service";
import { CREATE_USER, CreateUser } from "./service/create-user/create-user.interface";

@Controller("user")
export class UserController {
  constructor(private userService: UserService, @Inject(CREATE_USER) private readonly createUserService: CreateUser) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Get(":email")
  findEmail(@Param("email") email: string) {
    return this.userService.findEmail(email);
  }

  // @Delete("/:id")
  // deleteUser(@Param("id") id: string): void {
  //   this.userService.deleteUser(id);
  // }
}
