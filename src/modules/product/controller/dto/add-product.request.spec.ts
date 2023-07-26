import { v4 as uuidV4 } from "uuid";

import { AddProductRequest } from "@product/controller/dto/add-product.request";
import { AddProductCommand } from "@product/service/dto/add-product.command";

describe("AddProductRequest", () => {
  it("toCommand", () => {
    const name = "name";
    const price = 1;
    const description = "description";
    const storeId = uuidV4();

    const addProductRequest = new AddProductRequest({ name, price, description, storeId });

    const file = { path: "path" } as Express.Multer.File;
    const addProductCommand = addProductRequest.toCommand(file);

    expect(addProductCommand).toBeInstanceOf(AddProductCommand);
    expect(addProductCommand.name).toBe(name);
    expect(addProductCommand.price).toBe(price);
    expect(addProductCommand.description).toBe(description);
    expect(addProductCommand.storeId).toBe(storeId);
    expect(addProductCommand.image).toBe(file.path);
  });
});
