import { Test, TestingModule } from '@nestjs/testing';
import { AccountRegisterController } from './account-register.controller';

describe('AccountRegisterController', () => {
  let controller: AccountRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountRegisterController],
    }).compile();

    controller = module.get<AccountRegisterController>(AccountRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
