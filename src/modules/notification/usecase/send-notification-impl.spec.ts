import { Test, TestingModule } from "@nestjs/testing";

import { SEND_NOTIFICATION, SendNotification } from "@notification/usecase/send-notification";
import { SendNotificationImpl } from "@notification/usecase/send-notification-impl";

describe("SendNotification", () => {
  let sendNotification: SendNotification;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SEND_NOTIFICATION,
          useClass: SendNotificationImpl,
        },
      ],
    }).compile();

    sendNotification = module.get<SendNotification>(SEND_NOTIFICATION);
  });

  it("should be defined", () => {
    expect(sendNotification).toBeDefined();
  });
});
