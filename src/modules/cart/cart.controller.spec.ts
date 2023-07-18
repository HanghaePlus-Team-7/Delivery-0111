import { Test, TestingModule } from "@nestjs/testing";

import { CartController } from "@cart/cart.controller";
import { ADD_CART } from "@cart/services/add-cart/add-cart.interface";
import { AddCartService } from "@cart/services/add-cart/add-cart.service";

import { AddCartDto } from "./dto/request/add-cart.dto";

describe("CartController", () => {
  let controller: CartController;
  let addCartService: AddCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: ADD_CART, useClass: AddCartService }],
    }).compile();

    controller = module.get<CartController>(CartController);
    addCartService = module.get<AddCartService>(ADD_CART);

    jest.clearAllMocks();
  });

  describe("장바구니 추가(addCart)", () => {
    it("장바구니 추가 시 AddCartDto의 인스턴스를 argument로 호출하는지", async () => {
      const addCartDto = AddCartDto.of({ userId: 1n, productId: 2n, amount: 3 });

      await controller.addCart(addCartDto);
      expect(addCartService.execute).toBeCalledTimes(1);
      expect(addCartService.execute).toBeCalledWith(addCartDto);
    });
  });
});
