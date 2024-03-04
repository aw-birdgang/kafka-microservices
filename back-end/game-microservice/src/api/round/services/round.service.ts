import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Round } from '../entities/round.entity';
import { GameService } from '../../game/services/game.service';

@Injectable()
export class RoundService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(Round)
    private readonly roundRepository: Repository<Round>,
    private readonly gameService: GameService,
  ) {}

  findById(id: number): Promise<Round> {
    return this.roundRepository.findOneBy({ id });
  }

  findByGameIdAndTurnNumber(
    gameId: number,
    turnNumber: number,
  ): Promise<Round> {
    return this.roundRepository.findOneBy({ gameId, turnNumber });
  }
}
