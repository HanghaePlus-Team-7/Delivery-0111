import { Module } from "@nestjs/common";

import { NotificationModule } from "@root/modules/notification/notification.module";
import { PrismaModule } from "@root/prisma/prisma.module";

import { OrdersController } from "@orders/controller/orders.controller";
import { ORDERS_REPOSITORY } from "@orders/repository/orders.repository";
import { ORDERS_SERVICE } from "@orders/service/orders.service";
import { CONFIRM_ORDER } from "@orders/usecase/confirm-order/confirm-order";
import { ConfirmOrderImpl } from "@orders/usecase/confirm-order/confirm-order-impl";
import { GET_ORDERS_OF_STORE } from "@orders/usecase/get-orders-of-store/get-orders-of-store";

import { OrdersPrismaRepository } from "./repository/orders.prisma-repository";
import { OrdersServiceImpl } from "./service/orders.service-impl";
import { GetOrdersOfStoreImpl } from "./usecase/get-orders-of-store/get-orders-of-store-impl";

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: CONFIRM_ORDER,
      useClass: ConfirmOrderImpl,
    },
    {
      provide: GET_ORDERS_OF_STORE,
      useClass: GetOrdersOfStoreImpl,
    },
    { provide: ORDERS_REPOSITORY, useClass: OrdersPrismaRepository },
    { provide: ORDERS_SERVICE, useClass: OrdersServiceImpl },
  ],
})
export class OrdersModule {}
