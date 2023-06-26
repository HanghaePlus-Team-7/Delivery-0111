import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  id: string;
}
