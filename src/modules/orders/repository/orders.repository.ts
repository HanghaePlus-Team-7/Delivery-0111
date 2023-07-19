import { OrdersEntity } from "@orders/entities/orders.entity";

export interface OrdersRepository {
  updateOrderStatus: ({ id, status }: OrdersEntity) => Promise<void>;
  getOrdersOfStore: (id: bigint) => Promise<any[]>;
}

export const ORDERS_REPOSITORY = Symbol("ORDERS_REPOSITORY");
