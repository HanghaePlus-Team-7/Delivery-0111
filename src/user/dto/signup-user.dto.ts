import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class SignupUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  id: string;
  name: string;
  phone: string;
  address: string;
  bookmark: boolean;
}
