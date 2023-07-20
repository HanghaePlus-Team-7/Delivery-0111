import { ConfirmOrderType } from "@order/entity/order.type";

export interface ConfirmOrder {
  execute: (entity: ConfirmOrderType) => Promise<void>;
}

export const CONFIRM_ORDER = Symbol("CONFIRM_ORDER");
