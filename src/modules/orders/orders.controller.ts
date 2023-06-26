import { Controller, Inject, Param, Patch } from "@nestjs/common";

import { ConfirmOrdersDto } from "@root/modules/orders/dto/request/confirm-orders.dto";
import { CONFIRM_ORDER, ConfirmOrder } from "@root/modules/orders/services/confirm-order/confirm-order.interface";

@Controller("orders")
export class OrdersController {
  constructor(@Inject(CONFIRM_ORDER) private readonly confirmOrderService: ConfirmOrder) {}

  @Patch("/:orderId/confirmation")
  async confirmOrder(@Param() confirmOrdersDto: ConfirmOrdersDto): Promise<string> {
    return await this.confirmOrderService.execute(confirmOrdersDto);
  }
}
