import { HttpException, Injectable } from "@nestjs/common";
import { StoreRepository } from "../store.repository";
import { CreateStoreRequest } from "../dto";

@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}
  async createStore(createStoreRequest: CreateStoreRequest) {
    const existingUser = await this.storeRepository.findEmail(createStoreRequest.email);

    if (existingUser) {
      throw new HttpException(`duplicated ${createStoreRequest.email}`, 400);
    }

    return await this.storeRepository.createStore(createStoreRequest);
  }

  async findAll() {
    const found = await this.storeRepository.findAll();
    if (!found) {
      throw new HttpException(`there is no ${found}`, 400);
    }
    return found;
  }

  async findOne(id: number) {
    const found = await this.storeRepository.findOne(id);
    if (!found) {
      throw new HttpException(`there is no ${id}`, 400);
    }
    const { password, id: userId, ...result } = found;
    return result;
  }

  // deleteUser(id: string) {
  //   this.users = this.users.filter((user) => user.id !== id);
  // }
}
