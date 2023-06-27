import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "@user/dto/create-user.dto";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, nickname, phone, address, bookmarks } = createUserDto;

    return await this.prisma.user.create({
      data: {
        email,
        password,
        nickname,
        phone,
        address,
      },
    });
  }

  async findEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
