import { AddBasketDto } from "@shopping-basket/dto/shopping-basket.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddBasketService {
  addBasket(addBasketDto: AddBasketDto) {
    return "This action adds product in shopping basket";
  }
}
