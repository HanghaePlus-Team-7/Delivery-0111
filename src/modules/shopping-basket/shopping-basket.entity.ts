export class ShoppingBasketEntity {
  id: bigint;
  userId: bigint;
  productId: bigint;
  amount: bigint;

  constructor() {}

  static of(params: Partial<ShoppingBasketEntity>) {
    const entity = new ShoppingBasketEntity();
    Object.assign(entity, params);

    return entity;
  }
}
