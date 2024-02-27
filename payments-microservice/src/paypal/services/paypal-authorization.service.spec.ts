import { Test, TestingModule } from '@nestjs/testing';
import { PaypalAuthorizationService } from './paypal-authorization.service';

describe('PaypalAuthorizationService', () => {
  let service: PaypalAuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaypalAuthorizationService],
    }).compile();

    service = module.get<PaypalAuthorizationService>(PaypalAuthorizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
