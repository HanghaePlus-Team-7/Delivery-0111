import { HttpException, Injectable } from "@nestjs/common";

import { v4 as uuidV4 } from "uuid";

import { CreateUserDto } from "@root/modules/user/dto/request/create-user.dto";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { email, password, nickname, phone, address } = createUserDto;
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (existingUser) {
        throw new HttpException(`duplicated ${createUserDto.email}`, 400);
      }
      const user = await this.prisma.user.create({
        data: {
          id: uuidV4(),
          email,
          password,
          nickname,
          phone,
          address,
        },
      });
      const newUser = { ...user, id: user.id.toString() };
      return newUser;
    } catch (e: any) {
      throw new HttpException("PrismaClientKnownRequestError", 400);
    }
  }

  async findEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
