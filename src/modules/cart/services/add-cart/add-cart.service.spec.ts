import { Test, TestingModule } from "@nestjs/testing";

import { AddCartDto } from "@cart/dto/request/add-cart.dto";

import { CartRepository } from "./../../cart.repository";
import { ADD_CART } from "./add-cart.interface";
import { AddCartService } from "./add-cart.service";

jest.mock("@cart/cart.repository");

describe("AddCartService", () => {
  let addCartService: AddCartService;
  let cartRepository: CartRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ADD_CART,
          useClass: AddCartService,
        },
        CartRepository,
      ],
      // providers: [AddCartService],
    }).compile();

    addCartService = module.get<AddCartService>(ADD_CART);
    cartRepository = module.get<CartRepository>(CartRepository);
  });

  it("cartRepository.addCart가 실행하는지", async () => {
    const mockAddCartDto = AddCartDto.of({
      userId: 1n,
      productId: 2n,
      amount: 3,
    });

    await addCartService.execute(mockAddCartDto);
    expect(cartRepository.addCart).toBeCalledTimes(1);
  });
});
