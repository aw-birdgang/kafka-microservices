import { Controller } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { GameWinningRuleService } from '../services/game-winning-rule.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  GameMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { GameDetailsDto } from '../dto/game-details.dto';

@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly gameWinningRuleService: GameWinningRuleService,
  ) {}

  @MessagePattern(GameMessagePatterns.GAME_findGameDetailsByGameId)
  async findGameDetailsByGameId(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: TcpRequest<number>,
  ): Promise<TcpResponse<GameDetailsDto>> {
    return null;
  }
}
