import { Controller, Inject, Param, Patch } from "@nestjs/common";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { CONFIRM_ORDER, ConfirmOrder } from "@orders/services/confirm-order/confirm-order.interface";

@Controller("orders")
export class OrdersController {
  constructor(@Inject(CONFIRM_ORDER) private readonly confirmOrderService: ConfirmOrder) {}

  @Patch("/:orderId/confirmation")
  async confirmOrder(@Param() confirmOrdersDto: ConfirmOrdersDto): Promise<void> {
    return await this.confirmOrderService.execute(confirmOrdersDto);
  }
}
