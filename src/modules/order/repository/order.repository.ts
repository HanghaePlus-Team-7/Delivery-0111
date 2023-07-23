import { OrderStatus } from "@order/entity/order-status";

export interface OrderRepository {
  updateOrderStatus: (id: string, status: OrderStatus, confirmedOrderAt: Date) => Promise<void>;
  getOrdersOfStore: (id: string) => Promise<any[]>;
}

export const ORDERS_REPOSITORY = Symbol("ORDERS_REPOSITORY");
