import { v4 as uuidV4 } from "uuid";

import { isUuid } from "@root/libs/utils/is-uuid";

import { ProductEntity } from "@product/entity/product.entity";
describe("ProductEntity", () => {
  it("add product 상품 추가 할때 id로 uuid 생성함?", () => {
    const storeId = uuidV4();
    const name = "상품이름";
    const price = 1000;
    const description = "상품설명";
    const photoPath = "상품사진경로";

    const product = ProductEntity.forAddProduct({ storeId, name, price, description, photoPath });
    expect(isUuid(product.id ?? "")).toBe(true);
  });
});
