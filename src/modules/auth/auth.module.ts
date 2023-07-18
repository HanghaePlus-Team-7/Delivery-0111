import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { PrismaService } from "@root/prisma/prisma.service";

import config from "./auth.config";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { JwtStrategy } from "./dto";
import { AuthService } from "./service/auth.service";
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: config.jwt.secretOrKey,
      signOptions: {
        expiresIn: config.jwt.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, AuthRepository],
})
export class AuthModule {}
