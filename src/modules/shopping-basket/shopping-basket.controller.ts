import { Body, Controller, Get, Post } from "@nestjs/common";
import { AddBasketDto, GetAllBasketDto } from "@shopping-basket/dto/shopping-basket.dto";
import { AddBasketService } from "@shopping-basket/services/add-basket/add-basket.service";
import { GetAllBasketService } from "@shopping-basket/services/get-all-basket/get-all-basket.service";

@Controller("shopping-basket")
export class ShoppingBasketController {
  constructor(
    private readonly addBasketService: AddBasketService,
    private readonly getAllBasketService: GetAllBasketService,
  ) {}

  @Post()
  addBasket(@Body() addBasketDto: AddBasketDto) {
    return this.addBasketService.addBasket(addBasketDto);
  }

  @Get()
  getAllBasket(getAllBasketDto: GetAllBasketDto) {
    return this.getAllBasketService.getAllBasket(getAllBasketDto);
  }
}
