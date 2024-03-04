import { Test, TestingModule } from '@nestjs/testing';
import { DataValidationService } from './data-validation.service';

describe('DataValidationService', () => {
  let service: DataValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataValidationService],
    }).compile();

    service = module.get<DataValidationService>(DataValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
