import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";

export interface ConfirmOrder {
  execute: (confirmOrdersDto: ConfirmOrdersDto) => Promise<void>;
}

export const CONFIRM_ORDER = Symbol("CONFIRM_ORDER");
