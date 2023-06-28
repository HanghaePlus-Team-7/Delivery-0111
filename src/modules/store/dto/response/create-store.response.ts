import { ApiProperty } from "@nestjs/swagger";
import { Store } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export class CreateStoreResponse {
  @Exclude() private readonly _id: BigInt;
  email: string;
  password: string;
  name: string;
  telephone: string;
  address: string;
  openHour: string;
  closeHour: string;
  createdAt: string;
  updatedAt: string;

  constructor(store: Store) {
    this._id = store.id;
    this.email = store.email;
    this.password = store.password;
    this.name = store.name;
    this.telephone = store.telephone;
    this.address = store.address;
    this.openHour = store.openHour.toISOString();
    this.closeHour = store.closeHour.toISOString();
    this.createdAt = store.createdAt.toISOString();
    this.updatedAt = store.updatedAt.toISOString();
  }

  @ApiProperty()
  @Expose()
  get id(): string {
    return this._id.toString();
  }
}
