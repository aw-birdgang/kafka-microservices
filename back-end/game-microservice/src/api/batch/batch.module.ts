import { Module } from '@nestjs/common';
import { BatchController } from './controller/batch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchJobService } from './services/batch-job.service';
import { Batch } from 'typeorm';
import { BatchAggregationService } from './services/batch-aggregation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Batch]),
    // forwardRef(() => TicketModule),
  ],
  controllers: [BatchController],
  providers: [BatchAggregationService, BatchJobService],
  exports: [BatchAggregationService, BatchJobService],
})
export class RoundModule {}
