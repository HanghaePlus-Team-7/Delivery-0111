import { AddProductParam } from "@product/repository/interface/add-product-param";

import { ProductEntity } from "../entity/product.entity";

export interface ProductRepository {
  addProduct: (product: AddProductParam) => Promise<void>;
  getAllProducts: () => Promise<ProductEntity[]>;
  // getOneProduct
  // updateProduct
  // deleteProduct
}

export const PRODUCT_REPOSITORY = Symbol("PRODUCT_REPOSITORY");
