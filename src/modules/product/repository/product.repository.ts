import { Product } from "@prisma/client";

export interface ProductRepository {
  addProduct: (product: any) => Promise<void>;
  getAllProducts: (id: string) => Promise<Product[]>;
  // getOneProduct
  // updateProduct
  // deleteProduct
}

export const PRODUCT_REPOSITORY = Symbol("PRODUCT_REPOSITORY");
