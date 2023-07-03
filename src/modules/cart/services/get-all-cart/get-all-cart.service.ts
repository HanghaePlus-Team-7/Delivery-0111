import { Injectable } from "@nestjs/common";

import { GetAllCartDto } from "@root/modules/cart/dto/request/add-cart.dto";

@Injectable()
export class GetAllCartService {
  getAllBasket(getAllCartDto: GetAllCartDto) {
    return "This action gets all products in shopping basket";
  }
}
