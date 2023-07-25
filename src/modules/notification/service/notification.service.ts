import { Injectable } from "@nestjs/common";

import { OnSafeEvent } from "@root/libs/decorator/on-safe-event.decorator";

import { NotificationEvent } from "@notification/notification.event";
import { NotificationParam } from "@notification/service/interfaces/notification-param";

@Injectable()
export class NotificationService {
  @OnSafeEvent(NotificationEvent.ORDER_CONFIRMED, { async: true })
  async sendNotificationOrderConfirmed(param: NotificationParam): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
