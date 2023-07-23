export const NotificationEvent = {
  ORDER_CONFIRMED: "ORDER_CONFIRMED",
} as const;

export type NotificationEvent = (typeof NotificationEvent)[keyof typeof NotificationEvent];
