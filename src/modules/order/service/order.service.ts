import { UpdateOrderStatusCommand } from "@order/service/dto/update-order-status.command";

export interface OrderService {
  confirmOrder: (command: UpdateOrderStatusCommand) => Promise<void>;
  getOrdersOfStore: (id: bigint) => Promise<any[]>;
}

export const ORDERS_SERVICE = Symbol("ORDERS_SERVICE");
