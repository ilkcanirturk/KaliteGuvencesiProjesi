import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString() 
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'İlkcan Irtürk' })
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'ilkcan.irturk@mail.com' }) 
  email: string;
}