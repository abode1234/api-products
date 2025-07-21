import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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


@Get('/') 
  async findByName(
    @Query('name') name: string, 
  ): Promise<ProductModel| null> {
    return await this.productsService.findByName(name);
}

@Get('/all') 
  async findAll(): Promise<ProductModel[]> {
    return await this.productsService.findAll();
  }

}
