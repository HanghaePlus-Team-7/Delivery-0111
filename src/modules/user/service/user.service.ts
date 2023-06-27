import { ConflictException, HttpException, Injectable } from "@nestjs/common";

import { CreateUserDto } from "@user/dto/create-user.dto";
import { UserEntity } from "@user/user.entity";
import { PrismaService } from "@root/prisma/prisma.service";
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

  // deleteUser(id: string) {
  //   this.users = this.users.filter((user) => user.id !== id);
  // }
}
