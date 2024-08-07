import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClientAccessType } from '../../enum/account.enum';

export class ClientRegisterDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  accessUserId: number;

  @ApiProperty()
  @IsEnum(ClientAccessType)
  accessType: ClientAccessType;

  @ApiProperty()
  @IsString()
  deviceType: string;

  @ApiProperty()
  @IsString()
  os: string;

  @ApiProperty()
  @IsString()
  browser: string;

  @ApiProperty()
  @IsString()
  jwtRefreshToken: string;
}
