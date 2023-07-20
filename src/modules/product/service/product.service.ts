import { AddProductCommand } from "@product/service/dto/add-product.command";

export interface ProductService {
  addProduct(command: AddProductCommand): Promise<void>;
}

export const PRODUCT_SERVICE = Symbol("PRODUCT_SERVICE");
