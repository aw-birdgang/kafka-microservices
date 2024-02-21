import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerService } from './player/player.service';
import { PlayerService } from './services/player/player.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PlayerService],
})
export class AppModule {}
