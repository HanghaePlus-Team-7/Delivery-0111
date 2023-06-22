import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { StoreModule } from "./store/store.module";
import { ProductsModule } from "./products/products.module";
import { OrdersModule } from "./orders/orders.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { ShoppingBasketModule } from "./shopping-basket/shopping-basket.module";

@Module({
  imports: [UserModule, StoreModule, ProductsModule, OrdersModule, ReviewsModule, ShoppingBasketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
