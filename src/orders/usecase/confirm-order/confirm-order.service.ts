import { Injectable } from "@nestjs/common";
import { ConfirmOrdersDto } from "../../dto/request/confirm-orders.dto";

@Injectable()
export class ConfirmOrderService {
  constructor() {}

  async execute(confirmOrdersDto: ConfirmOrdersDto): Promise<string> {
    return `Order ${confirmOrdersDto.orderId} confirmed`;
  }
}
