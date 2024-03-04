import { Test, TestingModule } from '@nestjs/testing';
import { PaypalUtilsService } from './paypal-utils.service';

describe('PaypalUtilsService', () => {
  let service: PaypalUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaypalUtilsService],
    }).compile();

    service = module.get<PaypalUtilsService>(PaypalUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
