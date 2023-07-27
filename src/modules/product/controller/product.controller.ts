import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { AddProductRequest } from "@product/controller/dto/add-product.request";
import { AddProductUseCase } from "@product/usecase/add-product.use-case";
import { GetAllProductsUseCase } from "@product/usecase/get-all-products.use-case";

@Controller("products")
export class ProductController {
  constructor(
    private readonly addProductUseCase: AddProductUseCase,
    private readonly getAllProducts: GetAllProductsUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  async addProduct(@UploadedFile() photo: Express.Multer.File, @Body() addProductRequest: AddProductRequest) {
    await this.addProductUseCase.execute(addProductRequest.toCommand(photo));
  }

  @Get()
  async getAllProduct() {
    return await this.getAllProducts.execute();
  }
}
