import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min, IsArray } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Akıllı Telefon' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 19999.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0) 
  stock: number;

  @ApiProperty({
    example: [1, 2],
    description: 'Ürünün dahil olduğu kategori IDlerinin listesi',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}