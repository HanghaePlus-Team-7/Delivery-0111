import { OrderStatus } from "@orders/entities/order-status";

import { ProductsEntity } from "@products/products.entity";

import { StoreEntity } from "@store/store.entity";

import { UserEntity } from "@user/entities/user.entity";

export interface OrdersInterface {
  id: bigint;
  paymentType: string; // 지금은 string, 추후에 enum 생성 후 변경
  status: OrderStatus;
  paymentStatus: boolean;
  paidAt: Date;
  user: UserEntity;
  store: StoreEntity;
  OrderSheet: ProductsEntity[];
  receptedOrderAt: Date;
  confirmedOrderAt: Date;
  canceledOrderAt: Date;
  deliveryStartedAt: Date;
  deliveryCompletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
