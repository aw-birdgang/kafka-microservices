import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RolePermissionDto {
  @ApiProperty()
  @IsNumber()
  roleId: number;

  @ApiProperty()
  @IsString()
  roleName: string;

  @ApiProperty()
  @IsString()
  roleDescription: string;

  @ApiProperty()
  permissionList: string[];
}
