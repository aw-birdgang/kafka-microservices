import { Module } from '@nestjs/common';
import { DataValidationService } from './data-validation.service';

@Module({
  providers: [DataValidationService],
  exports: [DataValidationService],
})
export class DataValidationModule {}
