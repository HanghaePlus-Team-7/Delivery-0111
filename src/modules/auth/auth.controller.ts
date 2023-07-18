import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { LoginRequest, LoginResponse } from "./dto";
import { AuthService } from "./service/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.authService.login(loginRequest));
  }

  @Post("login/store")
  @HttpCode(HttpStatus.OK)
  async loginStore(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.authService.loginStore(loginRequest));
  }
}
