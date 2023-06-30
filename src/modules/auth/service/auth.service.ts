import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginRequest } from "../dto/request/login.request";
import { JwtPayload } from "../dto/jwt-payload";
import { User } from "@prisma/client";
import { LoginUserResponse } from "../dto/response/login-user.response";
import { AuthRepository } from "../auth.repository";

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository, private readonly jwtService: JwtService) {}

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.authRepository.findEmail(payload.email);

    if (user !== null && user.email === payload.email && user.nickname === payload.nickname) {
      return user;
    }
    throw new HttpException(`there is no ${user}`, 400);
  }

  async login(loginRequest: LoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.email.toLowerCase();
    const user = await this.authRepository.findEmail(normalizedIdentifier);
    if (user === null) {
      throw new HttpException(`there is no ${user}`, 400);
    }
    return await this.authRepository.login(loginRequest);
  }

  async loginStore(loginRequest: LoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.email.toLowerCase();
    const user = await this.authRepository.findEmail(normalizedIdentifier);
    if (user === null) {
      throw new HttpException(`there is no ${user}`, 400);
    }
    return await this.authRepository.loginStore(loginRequest);
  }
}
