import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 5,
    description: 'Değerlendirme puanı (1-5 arası tam sayı)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'Ürün tam olarak bir fiyat/performans ürünüdür. Tavsiye ederim.',
    description: 'Yorum metni (Opsiyonel)',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({ example: 1, description: 'Değerlendirilen ürünün IDsi' })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 1, description: 'Değerlendirmeyi yapan kullanıcının IDsi' })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}