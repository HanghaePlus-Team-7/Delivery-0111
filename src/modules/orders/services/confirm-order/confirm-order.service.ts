import { Injectable } from "@nestjs/common";

import { ConfirmOrdersDto } from "@root/modules/orders/dto/request/confirm-orders.dto";
import { ConfirmOrder } from "@root/modules/orders/services/confirm-order/confirm-order.interface";

@Injectable()
export class ConfirmOrderService implements ConfirmOrder {
  constructor() {}

  async execute(confirmOrdersDto: ConfirmOrdersDto): Promise<string> {
    return `Order ${confirmOrdersDto.orderId} confirmed`;
  }
}
