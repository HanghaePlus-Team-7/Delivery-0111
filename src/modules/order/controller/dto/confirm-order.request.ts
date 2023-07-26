import { IsNotEmpty, IsUUID } from "class-validator";

import { OrderMessage } from "@order/entity/order-message";
import { UpdateOrderStatusCommand } from "@order/service/dto/update-order-status.command";

export class ConfirmOrderRequest {
  @IsNotEmpty()
  @IsUUID(4)
  orderId: string;

  constructor(params: Partial<ConfirmOrderRequest>) {
    Object.assign(this, params);
  }

  static of(params: Partial<ConfirmOrderRequest>) {
    return new ConfirmOrderRequest(params);
  }

  public toCommand() {
    return new UpdateOrderStatusCommand(this.orderId, OrderMessage.CONFIRMED);
  }
}
