import { AddProductParam } from "@product/repository/interface/add-product-param";

export interface ProductRepository {
  addProduct: (product: AddProductParam) => Promise<void>;
}

export const PRODUCT_REPOSITORY = Symbol("PRODUCT_REPOSITORY");
