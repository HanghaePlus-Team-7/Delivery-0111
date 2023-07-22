import { OrderMessage } from "@order/entity/order-message";
import { OrderEntity } from "@order/entity/order.entity";

export class UpdateOrderStatusCommand {
  private readonly _orderId: string;
  private readonly _orderMessage: OrderMessage;

  constructor(orderId: string, orderMessage: OrderMessage) {
    this._orderId = orderId;
    this._orderMessage = orderMessage;
  }

  public get orderId(): string {
    return this._orderId;
  }

  public get orderMessage(): OrderMessage {
    return this._orderMessage;
  }

  public toConfirmOrderEntity() {
    return OrderEntity.forConfirmOrder(this.orderId);
  }

  public toNotification() {
    return { orderId: this.orderId, message: this.orderMessage };
  }
}
