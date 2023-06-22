import { IsUUID } from "class-validator";

export class ConfirmOrdersDto {
  @IsUUID()
  orderId: string;

  constructor() {}

  static of(params: Partial<ConfirmOrdersDto>) {
    const confirmOrdersDto = new ConfirmOrdersDto();
    Object.assign(confirmOrdersDto, params);

    return confirmOrdersDto;
  }
}
