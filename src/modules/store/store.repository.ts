import { Injectable } from "@nestjs/common";

import { v4 as uuidV4 } from "uuid";

import { PrismaService } from "../../prisma/prisma.service";

import { CreateStoreRequest } from "./dto";

@Injectable()
export class StoreRepository {
  constructor(private prisma: PrismaService) {}

  async createStore(createStoreDto: CreateStoreRequest) {
    const { email, password, name, telephone, address, openHour, closeHour } = createStoreDto;

    const store = await this.prisma.store.create({
      data: {
        id: uuidV4(),
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

  async findOne(id: string) {
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
