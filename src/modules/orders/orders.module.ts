import { Module } from "@nestjs/common";

import { PrismaService } from "@root/prisma/prisma.service";

import { OrdersController } from "@orders/orders.controller";
import { CONFIRM_ORDER } from "@orders/services/confirm-order/confirm-order.interface";
import { ConfirmOrderService } from "@orders/services/confirm-order/confirm-order.service";

import { OrdersRepository } from "./orders.repository";

@Module({
  controllers: [OrdersController],
  providers: [
    {
      provide: CONFIRM_ORDER,
      useClass: ConfirmOrderService,
    },
    PrismaService,
    OrdersRepository,
  ],
})
export class OrdersModule {}
