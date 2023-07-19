import { Controller, Get, Inject, Param, Patch } from "@nestjs/common";

import { ConfirmOrdersRequest } from "@orders/controller/dto/confirm-orders.request";
import { ORDERS_SERVICE, OrdersService } from "@orders/service/orders.service";

@Controller("orders")
export class OrdersController {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersService: OrdersService) {}

  @Patch("/:orderId/confirmation")
  async confirmOrder(@Param() confirmOrdersRequest: ConfirmOrdersRequest): Promise<void> {
    return await this.ordersService.confirmOrder(confirmOrdersRequest.toDto());
  }

  @Get("/stores/:storeId")
  async getOrdersOfStore(@Param("storeId") storeId: string) {
    return await this.ordersService.getOrdersOfStore(BigInt(storeId));
  }
}
