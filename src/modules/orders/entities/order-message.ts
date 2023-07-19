export const OrderMessage = {
  RECEPTION: "주문이 접수되었습니다.",
  CONFIRMED: "주문이 확정되었습니다.",
  CANCEL: "주문이 취소되었습니다.",
  DELIVERY_START: "배달이 시작되었습니다.",
  DELIVERY_COMPLETE: "배달이 완료되었습니다.",
} as const;

export type OrderMessage = (typeof OrderMessage)[keyof typeof OrderMessage];
