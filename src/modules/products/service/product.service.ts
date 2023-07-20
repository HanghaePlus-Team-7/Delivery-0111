import { AddProductCommand } from "@products/service/dto/add-product.command";

export interface ProductService {
  addProduct(command: AddProductCommand): Promise<void>;
}

export const PRODUCT_SERVICE = Symbol("PRODUCT_SERVICE");
