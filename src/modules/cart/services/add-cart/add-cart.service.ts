import { Injectable } from "@nestjs/common";

import { CartRepository } from "@cart/cart.repository";
import { AddCartDto } from "@cart/dto/request/add-cart.dto";
import { AddCart } from "@cart/services/add-cart/add-cart.interface";

// jest.mock("@cart/cart.repository");

// @Injectable()
// export class AddCartService {
//   addBasket(addCartDto: AddCartDto) {
//     return "This action adds product in shopping basket";
//   }
// }
@Injectable()
export class AddCartService implements AddCart {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(addCartDto: AddCartDto): Promise<void> {
    return await this.cartRepository.addCart(addCartDto.toEntity());
  }

  // addBasket(addCartDto: AddCartDto) {
  //   return "This action adds product in shopping basket";
  // }
}
