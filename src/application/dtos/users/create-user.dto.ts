import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    required: false,
  })
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 'John', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The lastname of the user' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '3212512333', description: 'The phone of the user' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'active', description: 'The status of the user' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: 'Administrador',
    description: 'The role of the user',
  })
  @IsNumber()
  @IsNotEmpty()
  role: Number;
}
