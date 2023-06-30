import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateStoreRequest, CreateStoreResponse } from "./dto";

@Injectable()
export class StoreRepository {
  constructor(private prisma: PrismaService) {}

  async createStore(createStoreDto: CreateStoreRequest) {
    const { email, password, name, telephone, address, openHour, closeHour } = createStoreDto;

    const store = await this.prisma.store.create({
      data: {
        email,
        password,
        name,
        telephone,
        address,
        openHour,
        closeHour,
      },
    });
    console.log("1", store);
    const newStore = { ...store, id: store.id.toString() };
    return newStore;
  }

  async findEmail(email: string) {
    return await this.prisma.store.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.store.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    const found = await this.prisma.store.findMany();
    const allStore = found.map((store) => {
      const { password, id: userId, ...result } = store;
      return result;
    });
    return allStore;
  }
}
