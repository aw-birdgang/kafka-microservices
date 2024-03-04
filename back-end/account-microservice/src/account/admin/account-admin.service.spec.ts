import { Test, TestingModule } from '@nestjs/testing';
import { AccountAdminService } from './account-admin.service';

describe('AccountAdminService', () => {
  let service: AccountAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountAdminService],
    }).compile();

    service = module.get<AccountAdminService>(AccountAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
