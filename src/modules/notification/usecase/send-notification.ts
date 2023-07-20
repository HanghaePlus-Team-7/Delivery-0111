import { NotificationParam } from "@notification/usecase/interfaces/notification-param";

export interface SendNotification {
  execute: (params: NotificationParam) => Promise<void>;
}

export const SEND_NOTIFICATION = Symbol("SEND_NOTIFICATION");
