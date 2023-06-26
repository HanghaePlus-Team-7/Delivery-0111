import { GetAllBasketDto } from "@shopping-basket/dto/shopping-basket.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllBasketService {
  getAllBasket(getAllBasket: GetAllBasketDto) {
    return "This action gets all products in shopping basket";
  }
}
