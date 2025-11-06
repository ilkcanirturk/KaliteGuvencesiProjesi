import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Siparişi veren kullanıcının IDsi' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 250.50, description: 'Sipariş toplam tutarı' })
  @IsNumber()
  @Min(0)
  totalAmount: number;
}