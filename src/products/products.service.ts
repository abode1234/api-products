import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from 'generated/prisma';

@Injectable()
export class ProductsService {

    constructor(
        private readonly prisma: PrismaService 
    ){}

    async create(dto: CreateProductDto): Promise<Product> {
        try {
            const created = await this.prisma.product.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    price: dto.price,
                    stock: dto.stock,
                    tags: (dto.tags ?? []).join(','),
                }
            });
            return created;
        } catch (error) {
            throw new HttpException('Error', HttpStatus.BAD_REQUEST);
        }
    } 
}
