import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { WinningNumberService } from './services/winning-number.service';
import { GameController } from './controller/game.controller';
import { GameService } from './services/game.service';
import { GameWinningRuleService } from './services/game-winning-rule.service';
import { GameWinningRule } from './entities/game-winning-rule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, GameWinningRule]),
    // forwardRef(() => TicketModule),
  ],
  controllers: [GameController],
  providers: [GameService, GameWinningRuleService, WinningNumberService],
  exports: [GameService, GameWinningRuleService, WinningNumberService],
})
export class GameModule {}
