import { IsNotEmpty } from "class-validator";

import { CartEntity } from "@cart/cart.entity";

export class AddCartDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  amount: number;

  constructor() {}

  static of(params: Partial<AddCartDto>) {
    const addCartDto = new AddCartDto();
    Object.assign(addCartDto, params);

    return addCartDto;
  }

  public toEntity() {
    return CartEntity.forAddCart({
      userId: this.userId,
      productId: this.productId,
      amount: this.amount,
    });
  }
}
