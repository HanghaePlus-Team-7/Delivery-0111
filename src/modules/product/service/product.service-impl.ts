import { Injectable } from "@nestjs/common";

import { AddProductCommand } from "@product/service/dto/add-product.command";
import { ProductService } from "@product/service/product.service";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor() {}
  addProduct(command: AddProductCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
