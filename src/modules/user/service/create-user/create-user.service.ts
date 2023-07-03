import { Injectable } from "@nestjs/common";
import { CreateUser } from "./create-user.interface";
import { UserRepository } from "../../user.repository";
import { CreateUserDto } from "../../dto/request/create-user.dto";

@Injectable()
export class CreateUserService implements CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }
}
