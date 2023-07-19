import { OrderStatus } from "@orders/entities/order-status";

export interface OrdersRepository {
  updateOrderStatus: (id: bigint, status: OrderStatus, confirmedOrderAt: Date) => Promise<void>;
  getOrdersOfStore: (id: bigint) => Promise<any[]>;
}

export const ORDERS_REPOSITORY = Symbol("ORDERS_REPOSITORY");
