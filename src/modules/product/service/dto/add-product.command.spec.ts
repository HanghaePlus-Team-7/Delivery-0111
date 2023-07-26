import { ProductEntity } from "@product/entity/product.entity";
import { AddProductCommand } from "@product/service/dto/add-product.command";

describe("AddProductCommend", () => {
  it("toEntity 가 ProductEntity 를 반환 해야 한다.", () => {
    const storeId = "storeId";
    const name = "name";
    const price = 1;
    const description = "description";
    const image = "image path";

    const addProductCommand = new AddProductCommand({ storeId, name, price, description, image });
    const productEntity = addProductCommand.toEntity();

    expect(productEntity).toBeInstanceOf(ProductEntity);
    expect(productEntity.storeId).toBe(storeId);
    expect(productEntity.name).toBe(name);
    expect(productEntity.price).toBe(price);
    expect(productEntity.description).toBe(description);
    expect(productEntity.image).toBe(image);
  });
});
