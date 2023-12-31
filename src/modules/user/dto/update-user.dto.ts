import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  id: string;
}
