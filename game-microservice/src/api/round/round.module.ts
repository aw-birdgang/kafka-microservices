import { Module } from '@nestjs/common';
import { RoundWinningNumberService } from './services/round-winning-number.service';
import { RoundService } from './services/round.service';
import { Round } from './entities/round.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundController } from './controller/round.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Round]),
    // forwardRef(() => TicketModule),
  ],
  controllers: [RoundController],
  providers: [RoundService, RoundWinningNumberService],
  exports: [RoundService, RoundWinningNumberService],
})
export class RoundModule {}
