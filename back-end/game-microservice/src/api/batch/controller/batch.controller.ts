import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BatchJobService } from '../services/batch-job.service';
import { RoundService } from '../../round/services/round.service';
import {
  GameMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { RoundCycleParameter } from '../../game/dto/game.parameter';
import { RoundDto } from '../../round/dto/round.dto';
import { isEmpty } from 'class-validator';

@Controller()
export class BatchController {
  constructor(
    private readonly batchJobService: BatchJobService,
    private readonly roundService: RoundService,
  ) {}

  // @MessagePattern(GameMessagePatterns.GAME_resetRoundByCycleCode)
  // async resetRoundByCycleCode(
  //   request: TcpRequest<RoundCycleParameter>,
  // ): Promise<TcpResponse<RoundDto>> {
  //   console.log('resetRoundByCycleCode -> ', request);
  //   const sessionUserId = request.headers['sessionUserId'];
  //   if (isEmpty(sessionUserId)) {
  //     throw new BusinessRpcException(ErrorCodes.BUS_ERROR_012);
  //   }
  //   const round = await this.roundService.resetRoundByCycleCode(
  //     request.data.cycleCode,
  //   );
  //   return TcpResponse.from<RoundDto>(round);
  // }
}
