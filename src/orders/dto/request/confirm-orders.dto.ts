import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ConfirmOrdersDto {
  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value))
  orderId: bigint;

  constructor() {}

  static of(params: Partial<ConfirmOrdersDto>) {
    const confirmOrdersDto = new ConfirmOrdersDto();
    Object.assign(confirmOrdersDto, params);

    return confirmOrdersDto;
  }
}
