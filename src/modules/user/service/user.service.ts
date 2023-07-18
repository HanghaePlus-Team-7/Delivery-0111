import { HttpException, Injectable } from "@nestjs/common";

import { CreateUserDto } from "@root/modules/user/dto/request/create-user.dto";

import { UserRepository } from "@user/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findEmail(createUserDto.email);

    if (existingUser) {
      throw new HttpException(`duplicated ${createUserDto.email}`, 400);
    }

    return await this.userRepository.createUser(createUserDto);
  }

  async findOne(id: number) {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new HttpException(`there is no ${id}`, 400);
    }
    const { password, id: userId, ...result } = found;
    return result;
  }
  async findEmail(email: string) {
    const found = await this.userRepository.findEmail(email);
    if (!found) {
      throw new HttpException(`there is no ${email}`, 400);
    }
    // const { password, id: userId, ...result } = found;
    return found;
  }
  // deleteUser(id: string) {
  //   this.users = this.users.filter((user) => user.id !== id);
  // }
}
