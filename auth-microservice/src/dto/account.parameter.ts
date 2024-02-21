import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClientAccessType } from './account.enum';

export class AdminUserFiltersParameter {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  static from(email: string, fullName: string) {
    const parameter = new AdminUserFiltersParameter();
    parameter.email = email;
    parameter.fullName = fullName;
    return parameter;
  }
}

export class EditTokenParameter {
  @ApiProperty()
  @IsNumber()
  accessUserId: number;

  @ApiProperty()
  @IsEnum(ClientAccessType)
  accessType: ClientAccessType;

  @ApiProperty()
  @IsString()
  jwtRefreshToken: string;

  static from(
    accessUserId: number,
    accessType: ClientAccessType,
    jwtRefreshToken: string,
  ) {
    const parameter = new EditTokenParameter();
    parameter.accessUserId = accessUserId;
    parameter.accessType = accessType;
    parameter.jwtRefreshToken = jwtRefreshToken;
    return parameter;
  }
}
