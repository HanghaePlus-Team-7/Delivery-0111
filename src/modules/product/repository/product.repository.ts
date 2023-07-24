import { AddProductParam } from "@product/repository/interface/add-product-param";

import { ProductEntity } from "../entity/product.entity";

import { GetAllProductsParam } from "./interface/get-all-products-param";

export interface ProductRepository {
  addProduct: (product: AddProductParam) => Promise<void>;
  getAllProducts: (params: GetAllProductsParam) => Promise<ProductEntity[]>; // 질문
  // getOneProduct
  // updateProduct
  // deleteProduct
}

export const PRODUCT_REPOSITORY = Symbol("PRODUCT_REPOSITORY");
