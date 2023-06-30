import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { StoreService } from "./service/store.service";
import { CreateStoreRequest } from "./dto";
@Controller("store")
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(":id")
  findOne(id: string) {
    return this.storeService.findOne(+id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createStore(@Body() createStoreRequest: CreateStoreRequest) {
    return this.storeService.createStore(createStoreRequest);
  }
}
