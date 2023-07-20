export class AddProductCommand {
  private readonly _name: string;
  private readonly _price: number;
  private readonly _description: string;
  private readonly _storeId: bigint;
  private readonly _photo: string;

  constructor(params: { name: string; price: number; description: string; storeId: bigint; photo: string }) {
    this._name = params.name;
    this._price = params.price;
    this._description = params.description;
    this._storeId = params.storeId;
    this._photo = params.photo;
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

  get storeId(): bigint {
    return this._storeId;
  }

  get photo(): string {
    return this._photo;
  }

  public toEntity() {}
}
