export class CartEntity {
  id: bigint;
  userId: bigint;
  productId: bigint;
  amount: number;

  constructor() {}

  // 부분적으로 채워진 CartEntity 인스턴스 생성하여 반환
  static of(params: Partial<CartEntity>) {
    const entity = new CartEntity();
    Object.assign(entity, params);

    return entity;
  }
}
