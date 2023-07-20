import { v4 as uuidV4 } from "uuid";

export class ProductsEntity {
  private readonly _id?: bigint;
  private readonly _storeId: bigint;
  private readonly _code: string;
  private readonly _name: string;
  private readonly _price: number;
  private readonly _description: string;
  private readonly _photo: string;
  private readonly _inStock?: boolean;

  constructor(params: {
    id?: bigint;
    storeId: bigint;
    code: string;
    name: string;
    price: number;
    description: string;
    photo: string;
    inStock?: boolean;
  }) {
    this._id = params.id;
    this._storeId = params.storeId;
    this._code = params.code;
    this._name = params.name;
    this._price = params.price;
    this._description = params.description;
    this._photo = params.photo;
    this._inStock = params.inStock;
  }

  get id() {
    return this._id;
  }

  get storeId() {
    return this._storeId;
  }

  get code() {
    return this._code;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get description() {
    return this._description;
  }

  get photo() {
    return this._photo;
  }

  get inStock() {
    return this._inStock;
  }

  static forAddProduct(params: { storeId: bigint; name: string; price: number; description: string; photo: string }) {
    return new ProductsEntity({
      storeId: params.storeId,
      name: params.name,
      price: params.price,
      description: params.description,
      photo: params.photo,
      code: uuidV4(),
    });
  }
}
