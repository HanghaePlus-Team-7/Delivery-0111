import { Module } from "@nestjs/common";

import { OrdersModule } from "@root/modules/orders/orders.module";
import { ProductsModule } from "@root/modules/products/products.module";
import { ReviewsModule } from "@root/modules/reviews/reviews.module";
import { ShoppingBasketModule } from "@root/modules/shopping-basket/shopping-basket.module";
import { StoreModule } from "@root/modules/store/store.module";
import { UserModule } from "@root/modules/user/user.module";

@Module({
  imports: [UserModule, StoreModule, ProductsModule, OrdersModule, ReviewsModule, ShoppingBasketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
