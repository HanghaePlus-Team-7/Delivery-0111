import { IsNotEmpty } from "class-validator";

export class BasketDto {
  @IsNotEmpty()
  id: bigint;

  @IsNotEmpty()
  userId: bigint;

  @IsNotEmpty()
  productId: bigint;

  @IsNotEmpty()
  amount: number;
}

export class AddBasketDto extends BasketDto {}
export class GetAllBasketDto extends Array<BasketDto> {}
