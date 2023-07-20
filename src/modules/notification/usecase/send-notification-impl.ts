import { Injectable } from "@nestjs/common";

import { NotificationParam } from "@notification/usecase/interfaces/notification-param";
import { SendNotification } from "@notification/usecase/send-notification";

@Injectable()
export class SendNotificationImpl implements SendNotification {
  execute(param: NotificationParam): Promise<void> {
    return Promise.resolve(undefined);
  }
}
