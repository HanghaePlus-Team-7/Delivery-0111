import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

import { OrderMessage } from "@orders/entities/order-message";
import { UpdateOrderStatusCommand } from "@orders/service/dto/update-order-status.command";

export class ConfirmOrdersRequest {
  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value))
  orderId: bigint;

  constructor(params: Partial<ConfirmOrdersRequest>) {
    Object.assign(this, params);
  }

  static of(params: Partial<ConfirmOrdersRequest>) {
    return new ConfirmOrdersRequest(params);
  }

  public toDto() {
    return new UpdateOrderStatusCommand(this.orderId, OrderMessage.CONFIRMED);
  }
}
