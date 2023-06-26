import { Injectable, ConflictException } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../user.entity";
import { User } from "./user.interface";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserService {
  private users: UserEntity[] = [];
  // constructor(private prisma: PrismaService) {}
  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, id, name, phone, address, bookmark } = createUserDto;
    const user: UserEntity = {
      email,
      password,
      id,
      name,
      phone,
      address,
      bookmark,
    };
    this.users.push(user);
    return user;
  }

  // async createUser(data: CreateUserDto) {
  //   const existingUser = await this.prisma.user.findUnique({
  //     where: {
  //       email: data.email,
  //     },
  //   });

  //   if (existingUser) {
  //     throw new ConflictException('이미 존재하는 이메일입니다.');
  //   }

  //   // 유저 생성 로직
  //   const newUser = await this.prisma.user.create({
  //     data,
  //   });

  //   return newUser;
  // }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
