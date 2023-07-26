import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { AddProductRequest } from "@product/controller/dto/add-product.request";
import { ProductService } from "@product/service/product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  async addProduct(@UploadedFile() photo: Express.Multer.File, @Body() addProductRequest: AddProductRequest) {
    await this.productService.addProduct(addProductRequest.toCommand(photo));
  }

  @Get()
  async getAllProduct() {
    return await this.productService.getAllProducts();
  }
}
