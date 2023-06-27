import { Module } from "@nestjs/common";

import { CartModule } from "@cart/cart.module";

import { OrdersModule } from "@orders/orders.module";

import { ProductsModule } from "@products/products.module";

import { ReviewsModule } from "@reviews/reviews.module";

import { StoreModule } from "@store/store.module";

import { UserModule } from "@user/user.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [UserModule, StoreModule, ProductsModule, OrdersModule, ReviewsModule, CartModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
