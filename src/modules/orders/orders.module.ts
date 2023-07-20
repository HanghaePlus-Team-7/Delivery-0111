import { Module } from "@nestjs/common";

import { NotificationModule } from "@root/modules/notification/notification.module";
import { PrismaModule } from "@root/prisma/prisma.module";

import { OrdersController } from "@orders/controller/orders.controller";
import { OrdersPrismaRepository } from "@orders/repository/orders.prisma-repository";
import { ORDERS_REPOSITORY } from "@orders/repository/orders.repository";
import { ORDERS_SERVICE } from "@orders/service/orders.service";
import { OrdersServiceImpl } from "@orders/service/orders.service-impl";
import { CONFIRM_ORDER } from "@orders/usecase/confirm-order/confirm-order";
import { ConfirmOrderImpl } from "@orders/usecase/confirm-order/confirm-order-impl";
import { GET_ORDERS_OF_STORE } from "@orders/usecase/get-orders-of-store/get-orders-of-store";
import { GetOrdersOfStoreImpl } from "@orders/usecase/get-orders-of-store/get-orders-of-store-impl";

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
    {
      provide: ORDERS_REPOSITORY,
      useClass: OrdersPrismaRepository,
    },
    {
      provide: ORDERS_SERVICE,
      useClass: OrdersServiceImpl,
    },
  ],
})
export class OrdersModule {}
