import { UpdateOrderStatusCommand } from "@orders/service/dto/update-order-status.command";

export interface OrdersService {
  confirmOrder: (command: UpdateOrderStatusCommand) => Promise<void>;
  getOrdersOfStore: (id: bigint) => Promise<any[]>;
}

export const ORDERS_SERVICE = Symbol("ORDERS_SERVICE");
