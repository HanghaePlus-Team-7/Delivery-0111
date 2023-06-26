import { Body, Controller, Post, Param, Delete, UsePipes, ValidationPipe } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./service/user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: string): void {
    this.userService.deleteUser(id);
  }
}
