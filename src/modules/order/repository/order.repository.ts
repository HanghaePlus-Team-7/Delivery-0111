import { OrderStatus } from "@order/entity/order-status";

export interface OrderRepository {
  updateOrderStatus: (id: bigint, status: OrderStatus, confirmedOrderAt: Date) => Promise<void>;
  getOrdersOfStore: (id: bigint) => Promise<any[]>;
}

export const ORDERS_REPOSITORY = Symbol("ORDERS_REPOSITORY");
