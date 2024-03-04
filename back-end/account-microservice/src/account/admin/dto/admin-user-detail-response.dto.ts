import { ApiProperty } from '@nestjs/swagger';
import { AdminUserResponseDto } from './admin-user-response.dto';
import { RoleDto } from '../../../system/role/dto/role.dto';

export class AdminUserDetailResponseDto {
  @ApiProperty()
  adminUserDto: AdminUserResponseDto;

  @ApiProperty()
  roleList: RoleDto[];

  static from(adminUserDto: AdminUserResponseDto, roleList: RoleDto[]) {
    const adminUserRoleDto = new AdminUserDetailResponseDto();
    adminUserRoleDto.adminUserDto = adminUserDto;
    adminUserRoleDto.roleList = roleList;
    return adminUserRoleDto;
  }
}
