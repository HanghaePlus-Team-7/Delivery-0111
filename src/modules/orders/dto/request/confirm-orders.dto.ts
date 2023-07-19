import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

import { ConfirmOrdersCommand } from "@orders/dto/command/confirm-orders.command";

export class ConfirmOrdersDto {
  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value))
  orderId: bigint;

  constructor(params: Partial<ConfirmOrdersDto>) {
    Object.assign(this, params);
  }

  static of(params: Partial<ConfirmOrdersDto>) {
    return new ConfirmOrdersDto(params);
  }

  public toCommand() {
    return new ConfirmOrdersCommand(this.orderId);
  }
}
