import { Module } from "@nestjs/common";

import { PrismaService } from "@root/prisma/prisma.service";

import { OrdersController } from "@orders/orders.controller";
import { CONFIRM_ORDER } from "@orders/services/confirm-order/confirm-order.interface";
import { ConfirmOrderService } from "@orders/services/confirm-order/confirm-order.service";
import { GET_ORDERS_OF_STORE } from "@orders/services/get-orders-of-store/get-orders-of-store.interface";

import { OrdersRepository } from "./orders.repository";
import { GetOrdersOfStoreService } from "./services/get-orders-of-store/get-orders-of-store.service";

@Module({
  controllers: [OrdersController],
  providers: [
    {
      provide: CONFIRM_ORDER,
      useClass: ConfirmOrderService,
    },
    {
      provide: GET_ORDERS_OF_STORE,
      useClass: GetOrdersOfStoreService,
    },
    PrismaService,
    OrdersRepository,
  ],
})
export class OrdersModule {}
