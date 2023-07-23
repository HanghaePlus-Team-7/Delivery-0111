import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { ProductEntity } from "@product/entity/product.entity";
import { PRODUCT_REPOSITORY, ProductRepository } from "@product/repository/product.repository";

@Injectable()
export class AddProduct {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository) {}

  async execute(productEntity: ProductEntity) {
    if (
      !productEntity.id ||
      !productEntity.name ||
      !productEntity.price ||
      !productEntity.description ||
      !productEntity.photoPath ||
      !productEntity.storeId
    )
      return Promise.reject(new BadRequestException());

    await this.productRepository.addProduct({
      id: productEntity.id,
      name: productEntity.name,
      price: productEntity.price,
      description: productEntity.description,
      image: productEntity.photoPath,
      storeId: productEntity.storeId,
    });
  }
}
