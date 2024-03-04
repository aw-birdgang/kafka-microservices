import { Injectable } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  findById(id: number): Promise<Game> {
    return this.gameRepository.findOneBy({ id });
  }
}
