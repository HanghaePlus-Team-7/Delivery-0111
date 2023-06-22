import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { ConfirmOrderService } from "./usecase/confirm-order/confirm-order.service";

@Module({
  controllers: [OrdersController],
  providers: [ConfirmOrderService],
})
export class OrdersModule {}
