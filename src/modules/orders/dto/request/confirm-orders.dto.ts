import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

import { OrdersEntity } from "@orders/entities/orders.entity";

export class ConfirmOrdersDto {
  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value))
  orderId: bigint;

  constructor() {}

  static of(params: Partial<ConfirmOrdersDto>) {
    const confirmOrdersDto = new ConfirmOrdersDto();
    Object.assign(confirmOrdersDto, params);

    return confirmOrdersDto;
  }

  public toEntity() {
    return OrdersEntity.forConfirmOrder(this.orderId);
  }
}
