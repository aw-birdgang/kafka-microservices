import { ApiProperty } from '@nestjs/swagger';
import { AdminUserResponseDto } from './admin-user-response.dto';
import { RoleDto } from '../../../system/role/dto/role.dto';

export class AdminProfileDto {
  @ApiProperty()
  adminUserDto: AdminUserResponseDto;

  @ApiProperty()
  roleList: RoleDto[];

  @ApiProperty()
  menuRolePermissionList: object;

  static from(
    adminUserDto: AdminUserResponseDto,
    roleList: RoleDto[],
    menuRolePermissionList: object,
  ) {
    const adminProfileDto = new AdminProfileDto();
    adminProfileDto.adminUserDto = adminUserDto;
    adminProfileDto.roleList = roleList;
    adminProfileDto.menuRolePermissionList = menuRolePermissionList;
    return adminProfileDto;
  }
}
