import { Module } from "@nestjs/common";

import { OrdersModule } from "@orders/orders.module";

import { ProductsModule } from "./products/products.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { ShoppingBasketModule } from "@shopping-basket/shopping-basket.module";
import { StoreModule } from "./store/store.module";
import { UserModule } from "./user/user.module";
import { AddBasketService } from "./shopping-basket/services/add-basket/add-basket.service";
import { GetAllBasketService } from "./shopping-basket/services/get-all-basket/get-all-basket.service";

@Module({
  imports: [UserModule, StoreModule, ProductsModule, OrdersModule, ReviewsModule, ShoppingBasketModule],
  controllers: [],
  providers: [AddBasketService, GetAllBasketService],
})
export class AppModule {}
