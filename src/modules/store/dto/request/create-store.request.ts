import { IsNotEmpty, IsString, Length, IsEmail, Matches } from "class-validator";

export class CreateStoreRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(4)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/i, {
    message: "비밀번호는 문자, 숫자, 특수문자를 모두 포함하는 8글자 이상입니다.",
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  openHour: Date;

  @IsNotEmpty()
  closeHour: Date;
}
