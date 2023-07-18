import { Module } from "@nestjs/common";

import { PrismaService } from "@root/prisma/prisma.service";

import { StoreService } from "./service/store.service";
import { StoreController } from "./store.controller";
import { StoreRepository } from "./store.repository";

@Module({
  controllers: [StoreController],
  providers: [StoreService, PrismaService, StoreRepository],
  exports: [StoreService],
})
export class StoreModule {}
