import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EditRoleParameter {
  @ApiProperty()
  @IsNumber()
  roleId: number;

  @ApiProperty()
  @IsString()
  roleName: string;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsString()
  permissionTable: object;
}

export class DeleteRoleParameter {
  @ApiProperty()
  @IsNumber()
  roleId: number;

  static from(roleId: number) {
    const parameter = new DeleteRoleParameter();
    parameter.roleId = roleId;
    return parameter;
  }
}
