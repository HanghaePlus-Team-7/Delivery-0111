import { Injectable } from "@nestjs/common";

import { ProductEntity } from "@product/entity/product.entity";
import { AddProductCommand } from "@product/service/dto/add-product.command";
import { AddProduct } from "@product/usecase/add-product/add-product";
import { GetAllProducts } from "@product/usecase/get-all-products/get-all-products";

@Injectable()
export class ProductService {
  constructor(private readonly addProductUseCase: AddProduct, private readonly getAllProductsUseCase: GetAllProducts) {}

  addProduct(command: AddProductCommand): Promise<void> {
    return this.addProductUseCase.execute(command.toEntity());
  }

  getAllProducts(): Promise<ProductEntity[]> {
    return this.getAllProductsUseCase.execute();
  }
}
