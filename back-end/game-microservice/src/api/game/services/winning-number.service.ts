import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WinningNumber } from '../entities/winning-number.entity';
import { Repository } from 'typeorm';
import { RoundService } from '../../round/services/round.service';

@Injectable()
export class WinningNumberService {
  constructor(
    @InjectRepository(WinningNumber)
    private readonly winningNumberRepository: Repository<WinningNumber>,
    private readonly roundService: RoundService,
  ) {}

  findByRoundId(roundId: number): Promise<WinningNumber> {
    return this.winningNumberRepository.findOneBy({ roundId });
  }
}
