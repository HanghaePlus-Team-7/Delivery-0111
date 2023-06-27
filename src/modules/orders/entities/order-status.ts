export const OrderStatus = {
  RECEPTION: "RECEPTION",
  CONFIRMED: "CONFIRMED",
  CANCEL: "CANCEL",
  DELIVERY_START: "DELIVERY_START",
  DELIVERY_COMPLETE: "DELIVERY_COMPLETE",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
