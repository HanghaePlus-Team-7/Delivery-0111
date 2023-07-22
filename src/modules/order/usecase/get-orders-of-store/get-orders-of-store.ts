export interface GetOrdersOfStore {
  execute: (id: string) => Promise<any[]>;
}

export const GET_ORDERS_OF_STORE = Symbol("GET_ORDERS_OF_STORE");
