import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminRoleDto {
  @ApiProperty()
  @IsNumber()
  adminUserId: number;

  @ApiProperty()
  @IsNumber()
  roleId: number;

  static from(adminUserId: number, roleId: number) {
    const adminRoleDto = new AdminRoleDto();
    adminRoleDto.adminUserId = adminUserId;
    adminRoleDto.roleId = roleId;
    return adminRoleDto;
  }
}
