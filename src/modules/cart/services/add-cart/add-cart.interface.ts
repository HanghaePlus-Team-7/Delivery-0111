import { AddCartDto } from "@cart/dto/cart.dto";

export interface AddCart {
  execute: (addCartDto: AddCartDto) => Promise<string>;
}

// Symbol : 고유하면서 수정할 수 없는 값, 즉 식별자
// 의존성 주입을 위해 주로 사용
export const ADD_CART = Symbol("ADD_CART");
