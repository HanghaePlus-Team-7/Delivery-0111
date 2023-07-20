import { OrderEntity } from "@order/entity/order.entity";

export type ConfirmOrderType = Pick<OrderEntity, "id" | "status" | "confirmedOrderAt">;
