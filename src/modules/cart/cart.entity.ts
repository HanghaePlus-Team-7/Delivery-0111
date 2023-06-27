export class CartEntity {
  id: bigint;
  userId: bigint;
  productId: bigint;
  amount: bigint;

  constructor() {}

  static of(params: Partial<CartEntity>) {
    const entity = new CartEntity();
    Object.assign(entity, params);

    return entity;
  }
}
