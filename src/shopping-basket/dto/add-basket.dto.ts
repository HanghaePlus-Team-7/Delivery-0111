import { IsNotEmpty } from "class-validator";

export class AddBasketDto {
  @IsNotEmpty()
  id: bigint;

  @IsNotEmpty()
  userId: bigint;

  @IsNotEmpty()
  productId: bigint;

  @IsNotEmpty()
  amount: number;
}
