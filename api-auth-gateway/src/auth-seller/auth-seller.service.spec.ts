import { Test, TestingModule } from '@nestjs/testing';
import { AuthSellerService } from './auth-seller.service';

describe('AuthSellerService', () => {
  let service: AuthSellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthSellerService],
    }).compile();

    service = module.get<AuthSellerService>(AuthSellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
