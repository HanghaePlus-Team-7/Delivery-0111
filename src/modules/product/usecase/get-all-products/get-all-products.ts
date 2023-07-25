import { Inject, Injectable } from "@nestjs/common";

import { PRODUCT_REPOSITORY, ProductRepository } from "@product/repository/product.repository";

@Injectable()
export class GetAllProducts {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository) {}

  async execute() {
    return await this.productRepository.getAllProducts();
  }
}
