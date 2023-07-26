import { Inject, Injectable } from "@nestjs/common";

import { PRODUCT_REPOSITORY, ProductRepository } from "@product/repository/product.repository";
import { AddProductCommand } from "@product/usecase/dto/add-product.command";

@Injectable()
export class AddProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(addProductCommand: AddProductCommand): Promise<void> {
    await this.productRepository.addProduct(addProductCommand.toEntity());
  }
}
