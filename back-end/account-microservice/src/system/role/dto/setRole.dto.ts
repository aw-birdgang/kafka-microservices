import { ApiProperty } from '@nestjs/swagger';

export class SetRoleDto {
  @ApiProperty()
  roleName: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  permissionTable: object;
}
