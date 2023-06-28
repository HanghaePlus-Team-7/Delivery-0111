import { Module } from "@nestjs/common";
import { StoreController } from "./store.controller";
import { StoreService } from "./service/store.service";
import { PrismaService } from "@root/prisma/prisma.service";
import { StoreRepository } from "./store.repository";

@Module({})
export class StoreModule {
  controllers: [StoreController];
  providers: [StoreService, PrismaService, StoreRepository];
  exports: [StoreService];
}
