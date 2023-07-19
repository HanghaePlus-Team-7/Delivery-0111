import { OrderMessage } from "@orders/entities/order-message";
import { OrdersEntity } from "@orders/entities/orders.entity";

export class ConfirmOrdersCommand {
  private readonly _orderId: bigint;
  private readonly _message: OrderMessage;

  constructor(orderId: bigint) {
    this._orderId = orderId;
    this._message = OrderMessage.CONFIRMED;
  }

  public get orderId(): bigint {
    return this._orderId;
  }

  public get message(): OrderMessage {
    return this._message;
  }

  public toEntity() {
    return OrdersEntity.forConfirmOrder(this.orderId);
  }

  public toNotification() {
    return { orderId: this.orderId, message: this.message };
  }
}
