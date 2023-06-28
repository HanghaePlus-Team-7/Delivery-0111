import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload, LoginRequest } from "./dto";
import { User } from "@prisma/client";
import { LoginUserResponse } from "./dto/response/login-user.response";

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (user !== null && user.email === payload.email && user.nickname === payload.nickname) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(loginRequest: LoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.email.toLowerCase();
    const user = await this.prisma.user.findFirst({
      where: {
        email: normalizedIdentifier,
      },
      select: {
        id: true,
        password: true,
        email: true,
        nickname: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log(user);
    if (user === null) {
      throw new UnauthorizedException();
    }
    const newUser = new LoginUserResponse(user);

    const payload: JwtPayload = {
      id: newUser.id,
      email: newUser.email,
      nickname: newUser.nickname,
    };

    return this.jwtService.signAsync(payload);
  }

  async findEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
