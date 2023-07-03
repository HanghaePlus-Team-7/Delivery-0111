import { CreateUserDto } from "../../dto/request/create-user.dto";
export interface CreateUser {
  execute(
    createUserDto: CreateUserDto,
  ): Promise<{
    id: string;
    email: string;
    password: string;
    nickname: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

export const CREATE_USER = Symbol("CREATE_USER");
