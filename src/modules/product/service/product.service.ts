import { Injectable } from "@nestjs/common";

import { AddProductCommand } from "@product/service/dto/add-product.command";
import { AddProduct } from "@product/usecase/add-product/add-product";

@Injectable()
export class ProductService {
  constructor(private readonly addProductUseCase: AddProduct) {}

  addProduct(command: AddProductCommand): Promise<void> {
    return this.addProductUseCase.execute(command.toEntity());
  }
}
