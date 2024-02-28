import { Test, TestingModule } from '@nestjs/testing';
import { AccountAdminController } from './account-admin.controller';

describe('AccountAdminController', () => {
  let controller: AccountAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountAdminController],
    }).compile();

    controller = module.get<AccountAdminController>(AccountAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
