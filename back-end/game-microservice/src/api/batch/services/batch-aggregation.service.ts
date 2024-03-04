import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RoundService } from '../../round/services/round.service';
import { WinningNumberService } from '../../game/services/winning-number.service';
import { BatchRoundRanking } from '../entities/batch-round-ranking.entity';
import { BatchJob } from '../entities/batch-job.entity';

@Injectable()
export class BatchAggregationService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private readonly roundService: RoundService,
    private readonly winningNumberService: WinningNumberService,
  ) {}

  /**
   * 게임 회차별 당첨랭킹 집계내역 조회
   */
  findRoundRankingList(roundId: number): Promise<BatchRoundRanking[]> {
    return this.entityManager
      .createQueryBuilder(BatchJob, 'bj')
      .innerJoin(BatchRoundRanking, 'br', 'br.batch_job_id = bj.id')
      .select('br.id', 'id')
      .addSelect('br.batch_job_id', 'batchJobId')
      .addSelect('br.ranking', 'ranking')
      .addSelect('br.total_amount', 'totalAmount')
      .addSelect('br.total_quantity', 'totalQuantity')
      .addSelect('br.prize_amount_per_ticket', 'prizeAmountPerTicket')
      .addSelect('br.payout_prize_amount', 'payoutPrizeAmount')
      .addSelect('br.payout_prize_quantity', 'payoutPrizeQuantity')
      .addSelect('br.not_payout_prize_amount', 'notPayoutPrizeAmount')
      .addSelect('br.not_payout_prize_quantity', 'notPayoutPrizeQuantity')
      .orderBy({ ranking: 'ASC' })
      .where('bj.round_id = :roundId', { roundId })
      .andWhere(
        `bj.start_date = (select max(start_date) from batch_job where round_id = bj.round_id)`,
      )
      .getRawMany<BatchRoundRanking>();
  }
}
