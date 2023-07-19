import { Injectable } from "@nestjs/common";

import { NotificationParam } from "@notification/notification-param";
import { NotificationService } from "@notification/notification.service";

@Injectable()
export class NotificationServiceImpl implements NotificationService {
  sendNotification(param: NotificationParam): Promise<void> {
    return Promise.resolve(undefined);
  }
}
