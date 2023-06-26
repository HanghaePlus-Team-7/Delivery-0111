import { Injectable } from "@nestjs/common";
import { SignupUserDto } from "../dto/signup-user.dto";
import { UserEntity } from "../user.entity";
import { User } from "./signup-user.interface";

@Injectable()
export class SignupUserService {
  private users: UserEntity[] = [];

  signupUser(signupUserDto: SignupUserDto) {
    const { email, password } = signupUserDto;
    const user: UserEntity = {
      email: email,
      password: password,
      id: "",
      name: "",
      phone: "",
      address: "",
      bookmark: false,
    };
    this.users.push(user);
    return user;
  }
}
