import { IsNotEmpty } from "class-validator";

export class AddCartDto {
  @IsNotEmpty()
  id: bigint;

  @IsNotEmpty()
  userId: bigint;

  @IsNotEmpty()
  productId: bigint;

  @IsNotEmpty()
  amount: number;

  constructor() {}

  static of(params: Partial<AddCartDto>) {
    const addCartDto = new AddCartDto();
    Object.assign(addCartDto, params);

    return addCartDto;
  }
}
