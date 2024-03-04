import { Test, TestingModule } from '@nestjs/testing';
import { AccountPlayerService } from './account-player.service';

describe('AccountPlayerService', () => {
  let service: AccountPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountPlayerService],
    }).compile();

    service = module.get<AccountPlayerService>(AccountPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
