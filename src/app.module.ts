import { Module } from "@nestjs/common";

import { OrdersModule } from "@orders/orders.module";

import { ProductsModule } from "./products/products.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { ShoppingBasketModule } from "./shopping-basket/shopping-basket.module";
import { StoreModule } from "./store/store.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule, StoreModule, ProductsModule, OrdersModule, ReviewsModule, ShoppingBasketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
