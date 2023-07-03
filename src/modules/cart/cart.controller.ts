import { Body, Controller, Get, Post } from "@nestjs/common";

import { AddCartDto, GetAllCartDto } from "@root/modules/cart/dto/request/add-cart.dto";
import { AddCartService } from "@cart/services/add-cart/add-cart.service";
import { GetAllCartService } from "@cart/services/get-all-cart/get-all-cart.service";

@Controller("cart")
export class CartController {
  constructor(private readonly addCartService: AddCartService, private readonly getAllCartService: GetAllCartService) {}

  @Post()
  addBasket(@Body() addCartDto: AddCartDto) {
    return this.addCartService.addBasket(addCartDto);
  }

  @Get()
  getAllBasket(getAllCart: GetAllCartDto) {
    return this.getAllCartService.getAllBasket(getAllCart);
  }
}
