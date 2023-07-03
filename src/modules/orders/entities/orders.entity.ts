import { OrderStatus } from "@orders/entities/order-status";

import { ProductsEntity } from "@products/products.entity";

import { StoreEntity } from "@store/store.entity";

import { UserEntity } from "@root/modules/user/entities/user.entity";

export class OrdersEntity {
  id: bigint;
  paymentType: string; // 지금은 string, 추후에 enum 생성 후 변경
  status: OrderStatus;
  paymentStatus: boolean;
  paidAt: Date;
  user: UserEntity;
  store: StoreEntity;
  OrderSheet: ProductsEntity[];
  orderedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: Partial<OrdersEntity>) {
    Object.assign(this, params);
  }

  static forConfirmOrder(id: bigint) {
    return new OrdersEntity({ id, status: OrderStatus.CONFIRMED });
  }
}
