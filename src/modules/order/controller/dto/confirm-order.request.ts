import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

import { OrderMessage } from "@order/entity/order-message";
import { UpdateOrderStatusCommand } from "@order/service/dto/update-order-status.command";

export class ConfirmOrderRequest {
  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value))
  orderId: bigint;

  constructor(params: Partial<ConfirmOrderRequest>) {
    Object.assign(this, params);
  }

  static of(params: Partial<ConfirmOrderRequest>) {
    return new ConfirmOrderRequest(params);
  }

  public toDto() {
    return new UpdateOrderStatusCommand(this.orderId, OrderMessage.CONFIRMED);
  }
}
