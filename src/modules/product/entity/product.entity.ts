import { v4 as uuidV4 } from "uuid";

export class ProductEntity {
  private readonly _id?: string;
  private readonly _storeId?: string;
  private readonly _name?: string;
  private readonly _price?: number;
  private readonly _description?: string;
  private readonly _image?: string;
  private readonly _inStock?: boolean;

  constructor(params: {
    id?: string;
    storeId?: string;
    name?: string;
    price?: number;
    description?: string;
    image?: string;
    inStock?: boolean;
  }) {
    this._id = params.id;
    this._storeId = params.storeId;
    this._name = params.name;
    this._price = params.price;
    this._description = params.description;
    this._image = params.image;
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

  get image() {
    return this._image;
  }

  get inStock() {
    return this._inStock;
  }

  static forAddProduct(params: { storeId: string; name: string; price: number; description: string; image: string }) {
    return new ProductEntity({
      id: uuidV4(),
      storeId: params.storeId,
      name: params.name,
      price: params.price,
      description: params.description,
      image: params.image,
    });
  }
}
