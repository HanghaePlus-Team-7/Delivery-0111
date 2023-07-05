import { Controller, Get, Inject, Param, Patch } from "@nestjs/common";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { CONFIRM_ORDER, ConfirmOrder } from "@orders/services/confirm-order/confirm-order.interface";
import {
  GET_ORDERS_OF_STORE,
  GetOrdersOfStore,
} from "@orders/services/get-orders-of-store/get-orders-of-store.interface";

@Controller("orders")
export class OrdersController {
  constructor(
    @Inject(CONFIRM_ORDER) private readonly confirmOrderService: ConfirmOrder,
    @Inject(GET_ORDERS_OF_STORE) private readonly getOrdersOfStoreService: GetOrdersOfStore,
  ) {}

  @Patch("/:orderId/confirmation")
  async confirmOrder(@Param() confirmOrdersDto: ConfirmOrdersDto): Promise<void> {
    return await this.confirmOrderService.execute(confirmOrdersDto);
  }

  @Get("/stores/:storeId")
  async getOrdersOfStore(@Param("storeId") storeId: string) {
    return await this.getOrdersOfStoreService.execute(BigInt(storeId));
  }

  @Get("/test")
  async test() {
    return "test";
  }
}
