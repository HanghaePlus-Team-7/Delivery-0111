export class ShoppingBasketEntity {
  id: string;
  userId: string;
  storeId: string; // 해보면서 생각
  productId: string; // 해보면서 생각
  code: string;
  name: string;
  amount: number;
  price: number;

  constructor() {}

  static of(params: Partial<ShoppingBasketEntity>) {
    const entity = new ShoppingBasketEntity();
    Object.assign(entity, params);

    return entity;
  }
}
