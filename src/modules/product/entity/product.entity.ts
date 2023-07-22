import { v4 as uuidV4 } from "uuid";

export class ProductEntity {
  private readonly _id?: string;
  private readonly _storeId?: string;
  private readonly _name?: string;
  private readonly _price?: number;
  private readonly _description?: string;
  private readonly _photoPath?: string;
  private readonly _inStock?: boolean;

  constructor(params: {
    id?: string;
    storeId?: string;
    name?: string;
    price?: number;
    description?: string;
    photoPath?: string;
    inStock?: boolean;
  }) {
    this._id = params.id;
    this._storeId = params.storeId;
    this._name = params.name;
    this._price = params.price;
    this._description = params.description;
    this._photoPath = params.photoPath;
    this._inStock = params.inStock;
  }

  get id() {
    return this._id;
  }

  get storeId() {
    return this._storeId;
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

  get photoPath() {
    return this._photoPath;
  }

  get inStock() {
    return this._inStock;
  }

  static forAddProduct(params: {
    storeId: string;
    name: string;
    price: number;
    description: string;
    photoPath: string;
  }) {
    return new ProductEntity({
      id: uuidV4(),
      storeId: params.storeId,
      name: params.name,
      price: params.price,
      description: params.description,
      photoPath: params.photoPath,
    });
  }
}
