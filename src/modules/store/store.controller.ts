import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { StoreService } from "./service/store.service";
import { CreateStoreRequest } from "./dto";
@Controller("store")
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createStore(@Body() createStoreRequest: CreateStoreRequest) {
    return this.storeService.createStore(createStoreRequest);
  }
}
