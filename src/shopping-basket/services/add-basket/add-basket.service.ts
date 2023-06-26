import { AddBasketDto } from "@shopping-basket/dto/add-basket.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddBasketService {
  addBasket(AddBasketDto: AddBasketDto) {
    return "This action adds product in shopping basket";
  }
}
