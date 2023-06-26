import { Module } from "@nestjs/common";
import { ShoppingBasketController } from "@shopping-basket/shopping-basket.controller";
import { AddBasketService } from "@shopping-basket/services/add-basket/add-basket.service";

@Module({
  controllers: [ShoppingBasketController],
  providers: [AddBasketService],
})
export class ShoppingBasketModule {}
