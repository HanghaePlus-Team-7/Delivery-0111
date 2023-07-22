import { IsNotEmpty } from "class-validator";

export class CartDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  amount: number;
}

export class AddCartDto extends CartDto {}
export class GetAllCartDto extends Array<CartDto> {}
