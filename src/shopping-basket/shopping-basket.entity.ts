export class ShoppingBasketEntity {
  id: number;
  userId: number;
  productId: number;

  constructor() {}

  static of(params: Partial<ShoppingBasketEntity>) {
    const entity = new ShoppingBasketEntity();
    Object.assign(entity, params);

    return entity;
  }
}
