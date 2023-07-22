import { v4 as uuidV4 } from "uuid";

export class CartEntity {
  id: string;
  userId: string;
  productId: string;
  amount: number;

  constructor() {}

  // 부분적으로 채워진 CartEntity 인스턴스 생성하여 반환
  static of(params: Partial<CartEntity>) {
    const entity = new CartEntity();
    Object.assign(entity, params);

    return entity;
  }

  static forAddCart(param: { userId: string; productId: string; amount: number }) {
    return CartEntity.of({
      id: uuidV4(),
      userId: param.userId,
      productId: param.productId,
      amount: param.amount,
    });
  }
}
