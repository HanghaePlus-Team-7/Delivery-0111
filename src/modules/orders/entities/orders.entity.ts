import { UserEntity } from "@root/modules/user/entities/user.entity";

import { OrderStatus } from "@orders/entities/order-status";
import { ConfirmOrder } from "@orders/entities/orders.type";

import { ProductsEntity } from "@products/products.entity";

import { StoreEntity } from "@store/store.entity";

export class OrdersEntity {
  private readonly _id?: bigint;
  private readonly _paymentType?: string; // 지금은 string, 추후에 enum 생성 후 변경
  private readonly _status?: OrderStatus;
  private readonly _paymentStatus?: boolean;
  private readonly _paidAt?: Date;
  private readonly _user?: UserEntity;
  private readonly _store?: StoreEntity;
  private readonly _OrderSheet?: ProductsEntity[];
  private readonly _receptedOrderAt?: Date;
  private readonly _confirmedOrderAt?: Date;
  private readonly _canceledOrderAt?: Date;
  private readonly _deliveryStartedAt?: Date;
  private readonly _deliveryCompletedAt?: Date;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  constructor(params: Partial<OrdersEntity>) {
    this._id = params.id;
    this._paymentType = params.paymentType;
    this._status = params.status;
    this._paymentStatus = params.paymentStatus;
    this._paidAt = params.paidAt;
    this._user = params.user;
    this._store = params.store;
    this._OrderSheet = params.OrderSheet;
    this._receptedOrderAt = params.receptedOrderAt;
    this._confirmedOrderAt = params.confirmedOrderAt;
    this._canceledOrderAt = params.canceledOrderAt;
    this._deliveryStartedAt = params.deliveryStartedAt;
    this._deliveryCompletedAt = params.deliveryCompletedAt;
    this._createdAt = params.createdAt;
    this._updatedAt = params.updatedAt;
  }

  get id() {
    return this._id;
  }

  get paymentType() {
    return this._paymentType;
  }

  get status() {
    return this._status;
  }

  get paymentStatus() {
    return this._paymentStatus;
  }

  get paidAt() {
    return this._paidAt;
  }

  get user() {
    return this._user;
  }

  get store() {
    return this._store;
  }

  get OrderSheet() {
    return this._OrderSheet;
  }

  get receptedOrderAt() {
    return this._receptedOrderAt;
  }

  get confirmedOrderAt() {
    return this._confirmedOrderAt;
  }

  get canceledOrderAt() {
    return this._canceledOrderAt;
  }

  get deliveryStartedAt() {
    return this._deliveryStartedAt;
  }

  get deliveryCompletedAt() {
    return this._deliveryCompletedAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static forConfirmOrder(id: bigint): ConfirmOrder {
    return new OrdersEntity({ id, status: OrderStatus.CONFIRMED, confirmedOrderAt: new Date() });
  }
}
