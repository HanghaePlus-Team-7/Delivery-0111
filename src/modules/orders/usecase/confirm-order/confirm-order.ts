import { ConfirmOrdersCommand } from "@orders/dto/command/confirm-orders.command";

export interface ConfirmOrder {
  execute: (command: ConfirmOrdersCommand) => Promise<void>;
}

export const CONFIRM_ORDER = Symbol("CONFIRM_ORDER");
