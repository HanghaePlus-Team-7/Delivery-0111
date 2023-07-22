import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { User } from "@prisma/client";

import { PrismaService } from "../../prisma/prisma.service";

import { JwtPayload, LoginRequest } from "./dto";
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

  async loginStore(loginRequest: LoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.email.toLowerCase();
    const store = await this.prisma.store.findFirst({
      where: {
        email: normalizedIdentifier,
      },
      select: {
        id: true,
        password: true,
        email: true,
        name: true,
        telephone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (store === null) {
      throw new UnauthorizedException();
    }

    const newStore = { ...store, id: store.id.toString() };

    const payload: JwtPayload = {
      id: newStore.id,
      email: newStore.email,
      nickname: newStore.name,
    };

    return this.jwtService.signAsync(payload);
  }
}
