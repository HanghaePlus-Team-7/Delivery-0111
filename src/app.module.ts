import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { LoggerMiddleware } from "@root/middleware/logger/logger.middleware";

import { CartModule } from "@cart/cart.module";

import { OrderModule } from "@order/order.module";

import { ProductModule } from "@product/product.module";

import { ReviewModule } from "@review/review.module";

import { StoreModule } from "@store/store.module";

import { UserModule } from "@user/user.module";

import { AuthModule } from "@auth/auth.module";

import { NotificationModule } from "@notification/notification.module";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModule,
    StoreModule,
    ProductModule,
    OrderModule,
    ReviewModule,
    CartModule,
    AuthModule,
    NotificationModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
