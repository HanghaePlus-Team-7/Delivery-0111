import { Body, Controller, Get, Post } from "@nestjs/common";
import { AddBasketDto } from "@shopping-basket/dto/add-basket.dto";
import { AddBasketService } from "@shopping-basket/services/add-basket/add-basket.service";

@Controller("shopping-basket")
export class ShoppingBasketController {
  constructor(private readonly addBasketService: AddBasketService) {}

  @Post()
  addBasket(@Body() addBasketDto: AddBasketDto) {
    return this.addBasketService.addBasket(addBasketDto);
  }
}
