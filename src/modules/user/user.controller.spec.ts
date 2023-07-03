import { Test, TestingModule } from "@nestjs/testing";

import { ConfirmOrdersDto } from "@orders/dto/request/confirm-orders.dto";
import { OrdersController } from "@orders/orders.controller";
import { CONFIRM_ORDER, ConfirmOrder } from "@orders/services/confirm-order/confirm-order.interface";
import { ConfirmOrderService } from "@orders/services/confirm-order/confirm-order.service";
import { USER } from "./service/user.interface";
import { GetOrdersOfStoreService } from "@orders/services/get-orders-of-store/get-orders-of-store.service";
import { UserController } from "./user.controller";
import { UserService } from "./service/user.service";

jest.mock("./service/user.service");

describe("UserController", () => {
  //   let controller: OrdersController;
  //   let confirmOrderService: ConfirmOrder;
  //   let getOrdersOfStore: GetOrdersOfStore;

  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: USER,
          useClass: UserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(USER);
    jest.clearAllMocks();
  });

  //   describe("주문 전체 조회 (getOrdersOfStore)", () => {
  //     it("주문 전체 조회 서비스를 가게의 아이디로 실행하나?", async () => {
  //       const storeId = "1";

  //       getOrdersOfStore.execute = jest.fn();

  //       await controller.getOrdersOfStore(storeId);
  //       expect(getOrdersOfStore.execute).toBeCalledTimes(1);
  //       expect(getOrdersOfStore.execute).toBeCalledWith(BigInt(storeId));
  //     });
  //   });
});
