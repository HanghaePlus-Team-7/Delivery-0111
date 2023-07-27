import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

import { AddProductCommand } from "@product/usecase/dto/add-product.command";

export class AddProductRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID(4)
  storeId: string;

  constructor(params: Partial<AddProductRequest>) {
    Object.assign(this, params);
  }

  public toCommand(photo: Express.Multer.File) {
    return new AddProductCommand({
      name: this.name,
      price: this.price,
      description: this.description,
      storeId: this.storeId,
      image: photo.path,
    });
  }
}
