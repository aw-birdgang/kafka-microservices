import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolePermissionDto } from './role-permission.dto';

export class MenuRolePermissionDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  languageCode: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  depth: number;

  @ApiProperty()
  @IsNumber()
  sort: number;

  @ApiProperty()
  rolePermissionList: RolePermissionDto[];
}
