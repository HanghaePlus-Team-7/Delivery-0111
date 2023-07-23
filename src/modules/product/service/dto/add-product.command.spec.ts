import { ProductEntity } from "@product/entity/product.entity";
import { AddProductCommand } from "@product/service/dto/add-product.command";

describe("AddProductRequest", () => {
  it("toCommand", () => {
    const storeId = "storeId";
    const name = "name";
    const price = 1;
    const description = "description";
    const photoPath = "photoPath";

    const addProductCommand = new AddProductCommand({ storeId, name, price, description, photoPath });
    const productEntity = addProductCommand.toEntity();

    expect(productEntity).toBeInstanceOf(ProductEntity);
    expect(productEntity.storeId).toBe(storeId);
    expect(productEntity.name).toBe(name);
    expect(productEntity.price).toBe(price);
    expect(productEntity.description).toBe(description);
    expect(productEntity.photoPath).toBe(photoPath);
  });
});
