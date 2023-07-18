import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "../../dto/request/create-user.dto";
import { UserRepository } from "../../user.repository";

import { CreateUser } from "./create-user.interface";

@Injectable()
export class CreateUserService implements CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }
}
