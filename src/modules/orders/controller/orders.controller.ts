import { Controller, Get, Inject, Param, Patch } from "@nestjs/common";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { ORDERS_SERVICE, OrdersService } from "@orders/service/orders.service";

@Controller("orders")
export class OrdersController {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersService: OrdersService) {}

  @Patch("/:orderId/confirmation")
  async confirmOrder(@Param() confirmOrdersDto: ConfirmOrdersDto): Promise<void> {
    return await this.ordersService.confirmOrder(confirmOrdersDto.toCommand());
  }

  @Get("/stores/:storeId")
  async getOrdersOfStore(@Param("storeId") storeId: string) {
    return await this.ordersService.getOrdersOfStore(BigInt(storeId));
  }
}
