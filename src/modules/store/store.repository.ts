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
    return new CreateStoreResponse(store);
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
}
