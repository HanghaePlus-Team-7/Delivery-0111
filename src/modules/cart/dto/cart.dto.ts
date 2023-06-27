import { IsNotEmpty } from "class-validator";

export class CartDto {
  @IsNotEmpty()
  id: bigint;

  @IsNotEmpty()
  userId: bigint;

  @IsNotEmpty()
  productId: bigint;

  @IsNotEmpty()
  amount: number;
}

export class AddCartDto extends CartDto {}
export class GetAllCartDto extends Array<CartDto> {}
