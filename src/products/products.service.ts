import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {

    constructor(
        private readonly prisma: PrismaService 
    ){}

    async create(dto: CreateProductDto): Promise<Product> {
        try {
            const created = await this.prisma.product.create({
                data: {
                    ...dto,
                    tags: (dto.tags ?? []).join(','),
                }
            });
            return created;
        } catch (error) {
            throw new HttpException('Error creating product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 
}
