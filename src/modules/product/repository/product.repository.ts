export interface ProductRepository {
  addProduct: (product: any) => Promise<void>;
}

export const PRODUCT_REPOSITORY = Symbol("PRODUCT_REPOSITORY");
