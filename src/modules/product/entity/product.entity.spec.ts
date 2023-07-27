import { v4 as uuidV4 } from "uuid";

import { isUuid } from "@root/libs/utils/is-uuid";

import { ProductEntity } from "@product/entity/product.entity";
describe("ProductEntity", () => {
  describe("forAddProduct", () => {
    it("forAddProduct 가 상품 추가할 때 필요한 데이터(id, storeId, name, price, description, image)를 반환 해야 한다.", () => {
      const storeId = uuidV4();
      const name = "상품이름";
      const price = 1000;
      const description = "상품설명";
      const image = "상품사진경로";

      const product = ProductEntity.forAddProduct({ storeId, name, price, description, image });
      expect(product).toBeInstanceOf(ProductEntity);
      expect(isUuid(product.id ?? "")).toBe(true);
      expect(product.storeId).toBe(storeId);
      expect(product.name).toBe(name);
      expect(product.price).toBe(price);
      expect(product.description).toBe(description);
      expect(product.image).toBe(image);
    });
  });
});
