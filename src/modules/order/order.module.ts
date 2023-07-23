import { Module } from "@nestjs/common";

import { PrismaModule } from "@root/prisma/prisma.module";

import { OrderController } from "@order/controller/order.controller";
import { OrderPrismaRepository } from "@order/repository/order.prisma-repository";
import { ORDERS_REPOSITORY } from "@order/repository/order.repository";
import { ORDERS_SERVICE } from "@order/service/order.service";
import { OrderServiceImpl } from "@order/service/order.service-impl";
import { CONFIRM_ORDER } from "@order/usecase/confirm-order/confirm-order";
import { ConfirmOrderImpl } from "@order/usecase/confirm-order/confirm-order-impl";
import { GET_ORDERS_OF_STORE } from "@order/usecase/get-orders-of-store/get-orders-of-store";
import { GetOrdersOfStoreImpl } from "@order/usecase/get-orders-of-store/get-orders-of-store-impl";

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
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
      useClass: OrderPrismaRepository,
    },
    {
      provide: ORDERS_SERVICE,
      useClass: OrderServiceImpl,
    },
  ],
})
export class OrderModule {}
