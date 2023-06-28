import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./service/auth.service";
import { PrismaService } from "@root/prisma/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import config from "./auth.config";
import { JwtStrategy } from "./dto";
import { AuthRepository } from "./auth.repository";
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
