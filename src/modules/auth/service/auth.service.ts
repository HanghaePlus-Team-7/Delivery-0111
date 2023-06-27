import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "@root/prisma/prisma.service";
import { UserRepository } from "@user/user.repository";
import { LoginRequest } from "../dto/request/login.request";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  //   async login(loginRequest: LoginRequest): Promise<string> {
  //     const normalizedIdentifier = loginRequest.email.toLowerCase();
  //     const user = await this.prisma.user.findFirst({
  //       where: {
  //         email: normalizedIdentifier,
  //       },
  //       select: {
  //         id: true,
  //         password: true,
  //         email: true,
  //         nickname: true,
  //       },
  //     });

  //     if (user === null) {
  //       throw new UnauthorizedException();
  //     }

  //     const payload: JwtPayload = {
  //       id: user.id,
  //       email: user.email,
  //       nickname: user.nickname,
  //     };

  //     return this.jwtService.signAsync(payload);
  //   }
  async login(loginRequest: LoginRequest): Promise<void> {}
}
