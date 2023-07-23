import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { ProductEntity } from "@product/entity/product.entity";
import { PRODUCT_REPOSITORY, ProductRepository } from "@product/repository/product.repository";

@Injectable()
export class AddProduct {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository) {}

  async execute(params: ProductEntity) {
    if (!params.id || !params.name || !params.price || !params.description || !params.photoPath || !params.storeId)
      return Promise.reject(new BadRequestException());

    await this.productRepository.addProduct({
      id: params.id,
      name: params.name,
      price: params.price,
      description: params.description,
      image: params.photoPath,
      storeId: params.storeId,
    });
  }
}
