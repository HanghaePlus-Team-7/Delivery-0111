import { IsNotEmpty, IsString, Length, IsEmail, Matches } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(5, 20)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "비밀번호는 문자, 숫자, 특수문자를 모두 포함하는 8글자 이상입니다.",
  })
  password: string;

  id: string;
  name: string;
  phone: string;
  address: string;
  bookmark: boolean;
}
