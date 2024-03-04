import { Controller } from '@nestjs/common';
import { RoundService } from '../services/round.service';
import { BatchAggregationService } from '../../batch/services/batch-aggregation.service';
import { WinningNumberService } from '../../game/services/winning-number.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  GameMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { RoundDto } from '../dto/round.dto';

@Controller()
export class RoundController {
  constructor(
    private readonly roundService: RoundService,
    private readonly batchService: BatchAggregationService,
    private readonly winningNumberService: WinningNumberService,
  ) {}

  @MessagePattern(GameMessagePatterns.GAME_findRoundById)
  async findRoundById(
    request: TcpRequest<number>,
  ): Promise<TcpResponse<RoundDto>> {
    const round = await this.roundService.findById(Number(request.data));
    return TcpResponse.from(round.toRoundDto());
  }
}
