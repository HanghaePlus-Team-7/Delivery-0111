import { ConfirmOrdersCommand } from "@orders/dto/command/confirm-orders.command";

export interface OrdersService {
  confirmOrder: (command: ConfirmOrdersCommand) => Promise<void>;
  getOrdersOfStore: (id: bigint) => Promise<any[]>;
}

export const ORDERS_SERVICE = Symbol("ORDERS_SERVICE");
