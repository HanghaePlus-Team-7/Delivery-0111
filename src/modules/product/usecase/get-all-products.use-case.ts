import { Inject, Injectable } from "@nestjs/common";

import { PRODUCT_REPOSITORY, ProductRepository } from "@product/repository/product.repository";

@Injectable()
export class GetAllProductsUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository) {}

  // 타입이 객체인 이유는 빈 배열도 객체의 일종으로 간주되기 때문
  async execute() {
    return await this.productRepository.getAllProducts();
  }
}
