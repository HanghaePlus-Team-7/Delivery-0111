export class StoreEntity {
  id: string;
  email: string;
  password: string;
  name: string;
  telephone: string;
  address: string;
  openHour: string;
  closeHour: string;

  constructor() {}

  static of(params: Partial<StoreEntity>) {
    const entity = new StoreEntity();
    Object.assign(entity, params);

    return entity;
  }
}
