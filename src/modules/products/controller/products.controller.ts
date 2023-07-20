import { Body, Controller, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { AddProductRequest } from "@products/controller/dto/add-product.request";
import { PRODUCT_SERVICE, ProductService } from "@products/service/product.service";

@Controller("products")
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  async addProduct(@UploadedFile() photo: Express.Multer.File, @Body() addProductRequest: AddProductRequest) {
    await this.productService.addProduct(addProductRequest.toCommand(photo));
  }
}
