import { Controller, Get, Inject, Param, Patch } from "@nestjs/common";

import { ConfirmOrderRequest } from "@order/controller/dto/confirm-order.request";
import { ORDERS_SERVICE, OrderService } from "@order/service/order.service";

@Controller("orders")
export class OrderController {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersService: OrderService) {}

  @Patch("/:orderId/confirmation")
  async confirmOrder(@Param() confirmOrdersRequest: ConfirmOrderRequest): Promise<void> {
    return await this.ordersService.confirmOrder(confirmOrdersRequest.toCommand());
  }

  @Get("/stores/:storeId")
  async getOrdersOfStore(@Param("storeId") storeId: string) {
    return await this.ordersService.getOrdersOfStore(storeId);
  }
}
