import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GameStatus } from '../enums/game.enum';

export class SaveGameStatusDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsEnum(GameStatus)
  status: GameStatus;
}
