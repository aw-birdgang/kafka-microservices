import { Injectable } from '@nestjs/common';
import { BatchJob } from '../entities/batch-job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoundService } from '../../round/services/round.service';
import { WinningNumberService } from '../../game/services/winning-number.service';

@Injectable()
export class BatchJobService {
  constructor(
    @InjectRepository(BatchJob)
    private readonly batchJobRepository: Repository<BatchJob>,
    private readonly roundService: RoundService,
    private readonly winningNumberService: WinningNumberService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async forcedBatchJob(sessionUserId: number) {}
}
