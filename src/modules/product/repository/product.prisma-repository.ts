import { Injectable } from "@nestjs/common";

import { ProductRepository } from "@product/repository/product.repository";

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  addProduct(product: any): Promise<void> {
    return Promise.resolve(undefined);
  }
}
