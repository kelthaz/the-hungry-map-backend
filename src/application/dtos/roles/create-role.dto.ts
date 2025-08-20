import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
    required: false,
  })
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 'Administrado', description: 'The name of the role' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
