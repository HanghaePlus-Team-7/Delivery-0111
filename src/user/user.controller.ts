import { Body, Controller, Get, Post, Param, Delete, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { User } from "./service/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

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
