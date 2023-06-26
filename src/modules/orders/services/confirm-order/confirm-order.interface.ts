import { ConfirmOrdersDto } from "@root/modules/orders/dto/request/confirm-orders.dto";

export interface ConfirmOrder {
  execute: (confirmOrdersDto: ConfirmOrdersDto) => Promise<string>;
}

export const CONFIRM_ORDER = Symbol("CONFIRM_ORDER");
