import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("products")
export class ProductsController {
  constructor() {}

  @Post()
  @UseInterceptors(FilesInterceptor("photo"))
  async addProduct(@UploadedFiles() photo: Express.Multer.File) {
    throw new Error("Not Implemented");
  }
}
