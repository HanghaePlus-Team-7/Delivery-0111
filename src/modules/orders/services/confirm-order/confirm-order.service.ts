import { Injectable } from "@nestjs/common";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { ConfirmOrder } from "@orders/services/confirm-order/confirm-order.interface";

@Injectable()
export class ConfirmOrderService implements ConfirmOrder {
  constructor() {}

  async execute(confirmOrdersDto: ConfirmOrdersDto): Promise<string> {
    return `Order ${confirmOrdersDto.orderId} confirmed`;
  }
}
