import { Injectable } from "@nestjs/common";

import { AddProductCommand } from "@products/service/dto/add-product.command";
import { ProductService } from "@products/service/product.service";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor() {}
  addProduct(command: AddProductCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
