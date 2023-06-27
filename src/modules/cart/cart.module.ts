import { Module } from "@nestjs/common";

import { CartController } from "@cart/cart.controller";
import { AddCartService } from "@cart/services/add-cart/add-cart.service";
import { GetAllCartService } from "@cart/services/get-all-cart/get-all-cart.service";

@Module({
  controllers: [CartController],
  providers: [AddCartService, GetAllCartService],
})
export class CartModule {}
