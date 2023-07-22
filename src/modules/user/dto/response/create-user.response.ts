import { ApiProperty } from "@nestjs/swagger";

import { User } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export class CreateUserResponse {
  @Exclude() private readonly _id: string;
  email: string;
  password: string;
  nickname: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: User) {
    this._id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.nickname = user.nickname;
    this.phone = user.phone;
    this.address = user.address;
    this.createdAt = user.createdAt.toISOString();
    this.updatedAt = user.updatedAt.toISOString();
  }

  @ApiProperty()
  @Expose()
  get id(): string {
    return this._id.toString();
  }
}
