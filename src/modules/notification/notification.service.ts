import { NotificationParam } from "@notification/notification-param";

export interface NotificationService {
  sendNotification: (params: NotificationParam) => Promise<void>;
}

export const NOTIFICATION_SERVICE = Symbol("NOTIFICATION_SERVICE");
