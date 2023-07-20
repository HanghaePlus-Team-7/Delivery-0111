import { Module } from "@nestjs/common";

import { SEND_NOTIFICATION } from "@notification/usecase/send-notification";
import { SendNotificationImpl } from "@notification/usecase/send-notification-impl";

@Module({
  providers: [
    {
      provide: SEND_NOTIFICATION,
      useClass: SendNotificationImpl,
    },
  ],
  exports: [
    {
      provide: SEND_NOTIFICATION,
      useClass: SendNotificationImpl,
    },
  ],
})
export class NotificationModule {}
