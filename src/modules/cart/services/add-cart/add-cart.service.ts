import { Injectable } from "@nestjs/common";

import { AddCartDto } from "@cart/dto/cart.dto";

@Injectable()
export class AddCartService {
  addBasket(addCartDto: AddCartDto) {
    return "This action adds product in shopping basket";
  }
}
