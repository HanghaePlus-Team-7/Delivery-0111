import { Controller, Param, Patch } from "@nestjs/common";
import { ConfirmOrdersDto } from "./dto/request/confirm-orders.dto";
import { ConfirmOrderService } from "./usecase/confirm-order/confirm-order.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly confirmOrderService: ConfirmOrderService) {}

  @Patch("/:orderId/confirmation")
  async confirmOrder(@Param() confirmOrdersDto: ConfirmOrdersDto): Promise<string> {
    return await this.confirmOrderService.execute(confirmOrdersDto);
  }
}
