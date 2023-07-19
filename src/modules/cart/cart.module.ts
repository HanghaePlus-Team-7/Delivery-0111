import { Module } from "@nestjs/common";

import { PrismaModule } from "@root/prisma/prisma.module";

import { CartController } from "@cart/cart.controller";
import { CartRepository } from "@cart/cart.repository";
import { AddCartService } from "@cart/services/add-cart/add-cart.service";
import { GetAllCartService } from "@cart/services/get-all-cart/get-all-cart.service";

@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [AddCartService, GetAllCartService, CartRepository],
})
export class CartModule {}
