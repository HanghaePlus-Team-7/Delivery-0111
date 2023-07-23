import { Injectable } from "@nestjs/common";

import { AddProductCommand } from "@product/service/dto/add-product.command";

@Injectable()
export class ProductService {
  constructor() {}
  addProduct(command: AddProductCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
