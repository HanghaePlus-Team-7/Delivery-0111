import { ProductEntity } from "@product/entity/product.entity";

export class AddProductCommand {
  private readonly _name: string;
  private readonly _price: number;
  private readonly _description: string;
  private readonly _storeId: string;
  private readonly _image: string;

  constructor(params: { name: string; price: number; description: string; storeId: string; image: string }) {
    this._name = params.name;
    this._price = params.price;
    this._description = params.description;
    this._storeId = params.storeId;
    this._image = params.image;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get description(): string {
    return this._description;
  }

  get storeId(): string {
    return this._storeId;
  }

  get image(): string {
    return this._image;
  }

  public toEntity() {
    return ProductEntity.forAddProduct({
      storeId: this.storeId,
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.image,
    });
  }
}
