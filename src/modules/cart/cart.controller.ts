import { Body, Controller, Inject, Post } from "@nestjs/common";

import { AddCartDto } from "@cart/dto/request/add-cart.dto";
import { ADD_CART } from "@cart/services/add-cart/add-cart.interface";
import { AddCartService } from "@cart/services/add-cart/add-cart.service";
import { GetAllCartService } from "@cart/services/get-all-cart/get-all-cart.service";

@Controller("cart")
export class CartController {
  constructor(
    @Inject(ADD_CART) private readonly addCartService: AddCartService,
    private readonly getAllCartService: GetAllCartService,
  ) {}

  @Post()
  addCart(@Body() addCartDto: AddCartDto) {
    return this.addCartService.execute(addCartDto);
  }

  // @Get()
  // getAllBasket(getAllCart: GetAllCartDto) {
  //   return this.getAllCartService.getAllBasket(getAllCart);
  // }
}
