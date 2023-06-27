import { Body, Controller, Get, Post } from "@nestjs/common";

import { AddCartDto, GetAllCartDto } from "@cart/dto/cart.dto";
import { AddCartService } from "@cart/services/add-cart/add-cart.service";
import { GetAllCartService } from "@cart/services/get-all-cart/get-all-cart.service";

@Controller("cart")
export class CartController {
  constructor(
    private readonly addBasketService: AddCartService,
    private readonly getAllBasketService: GetAllCartService,
  ) {}

  @Post()
  addBasket(@Body() addBasketDto: AddCartDto) {
    return this.addBasketService.addBasket(addBasketDto);
  }

  @Get()
  getAllBasket(getAllBasketDto: GetAllCartDto) {
    return this.getAllBasketService.getAllBasket(getAllBasketDto);
  }
}
