import { Module } from "@nestjs/common";

import { NOTIFICATION_SERVICE } from "@notification/notification.service";

import { NotificationServiceImpl } from "./notification.service-impl";

@Module({
  providers: [
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationServiceImpl,
    },
  ],
  exports: [
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationServiceImpl,
    },
  ],
})
export class NotificationModule {}
