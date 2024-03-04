import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminUserDto {
  @ApiProperty({ example: '문자열, 필수' })
  @IsString()
  username: string;

  @ApiProperty({ example: '문자열, 필수' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '문자열, 필수' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  fullName: string;
}
