import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { LoginRequest, LoginResponse } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.authService.login(loginRequest));
  }
}
