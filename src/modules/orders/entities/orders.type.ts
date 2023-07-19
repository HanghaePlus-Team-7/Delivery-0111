import { OrdersEntity } from "@orders/entities/orders.entity";

export type ConfirmOrder = Pick<OrdersEntity, "id" | "status" | "confirmedOrderAt">;
