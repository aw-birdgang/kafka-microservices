import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { GameWinningRule } from '../entities/game-winning-rule.entity';

@Injectable()
export class GameWinningRuleService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(GameWinningRule)
    private gameWinningRuleRepository: Repository<GameWinningRule>,
  ) {}

  findById(id: number): Promise<GameWinningRule> {
    return this.gameWinningRuleRepository.findOneBy({ id: id });
  }

  findByGameId(gameId: number): Promise<GameWinningRule[]> {
    return this.gameWinningRuleRepository.findBy({ gameId });
  }
}
