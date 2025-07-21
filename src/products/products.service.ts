/**
 * Creates a new product in the database.
 * @param dto The data transfer object containing product details.
 * @returns A Promise that resolves to the created Product object.
 * @throws HttpException if product creation fails (e.g., duplicate name, internal server error).
 */


import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

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
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new HttpException('Product with this name already exists', HttpStatus.CONFLICT);
            }
            throw new HttpException('Error creating product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByName(name: string): Promise<Product| null> {
        try {
            return await this.prisma.product.findFirst({
                where: {
                    name: name,
                }
            });
        } catch (error) {
            throw new HttpException('Error fetching product from database', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.prisma.product.findMany();
        } catch (error) {
            throw new HttpException('Error fetching products from database', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
