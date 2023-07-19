import { ConfirmOrder as ConfirmOrderType } from "@orders/entities/orders.type";

export interface ConfirmOrder {
  execute: (entity: ConfirmOrderType) => Promise<void>;
}

export const CONFIRM_ORDER = Symbol("CONFIRM_ORDER");
