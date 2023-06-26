import { Module } from "@nestjs/common";
import { ShoppingBasketController } from "@shopping-basket/shopping-basket.controller";
import { AddBasketService } from "@shopping-basket/services/add-basket/add-basket.service";
import { GetAllBasketService } from "@shopping-basket/services/get-all-basket/get-all-basket.service";

@Module({
  controllers: [ShoppingBasketController],
  providers: [AddBasketService, GetAllBasketService],
})
export class ShoppingBasketModule {}
