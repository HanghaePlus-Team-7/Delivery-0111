export class OrdersEntity {
  id: string;
  userId: string;
  storeId: string;
  orderSheet: object; // 더 생각해보기
  totalPrice: number;
  paymentType: string; // 지금은 string, 추후에 enum 생성 후 변경
  orderStatus: string; // 지금은 string, 추후에 enum 생성 후 변경
  orderedAt: Date;
  paymentStatus: boolean;
  paidAt: Date;
}
