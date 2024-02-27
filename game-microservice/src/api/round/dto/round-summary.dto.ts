import { ApiProperty } from '@nestjs/swagger';
import { RoundDto } from './round.dto';
import { BatchRoundAggregationDto } from '../../batch/dto/batch-round-aggregation.dto';
import { BatchRoundRankingDto } from '../../batch/dto/batch-round-ranking.dto';
import { WinningNumberDto } from '../../game/dto/winning-number.dto';

export class RoundSummaryDto {
  @ApiProperty()
  roundDto: RoundDto;

  @ApiProperty()
  winningNumberDto: WinningNumberDto;

  @ApiProperty()
  batchRoundAggregationDto: BatchRoundAggregationDto;

  @ApiProperty()
  batchRoundRankingDtoList: BatchRoundRankingDto[];
}
