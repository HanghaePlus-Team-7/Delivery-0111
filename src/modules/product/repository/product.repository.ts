import { ProductEntity } from "../entity/product.entity";

export interface ProductRepository {
  addProduct: (product: ProductEntity) => Promise<ProductEntity>;
  getAllProducts: () => Promise<ProductEntity[]>;
  // getOneProduct
  // updateProduct
  // deleteProduct
}

export const PRODUCT_REPOSITORY = Symbol("PRODUCT_REPOSITORY");
