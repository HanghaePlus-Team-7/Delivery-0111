import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { AddProductCommand } from "@products/service/dto/add-product.command";

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
  @Transform(({ value }) => BigInt(value))
  storeId: bigint;

  constructor(params: Partial<AddProductRequest>) {
    Object.assign(this, params);
  }

  public toCommand(photo: Express.Multer.File) {
    return new AddProductCommand({
      name: this.name,
      price: this.price,
      description: this.description,
      storeId: this.storeId,
      photo: photo.path,
    });
  }
}
