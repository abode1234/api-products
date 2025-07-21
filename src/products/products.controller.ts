import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product as ProductModel } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post('/create')
  async create(
    @Body() postData: CreateProductDto, 
  ): Promise<ProductModel> {
      console.log(postData);
      return await this.productsService.create(postData);
  }
}