import { IsString, IsNumber, IsNotEmpty, Min, IsOptional, IsArray, ArrayMinSize } from 'class-validator';

export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString({ each: true }) // Validates each element in the array as a string
  @IsArray()
  @ArrayMinSize(0) // Allows an empty array
  tags?: string[]; // Optional array of strings for tags
}
