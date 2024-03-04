import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminUserDto } from './create-admin-user.dto';

export class CreateAdminUserRoleDto {
  @ApiProperty()
  createAdminUserDto: CreateAdminUserDto;

  @ApiProperty()
  @IsNumber()
  roleId: number;
}
