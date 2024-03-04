import { Test, TestingModule } from '@nestjs/testing';
import { AccountRegisterService } from './account-register.service';

describe('AccountRegisterService', () => {
  let service: AccountRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRegisterService],
    }).compile();

    service = module.get<AccountRegisterService>(AccountRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
