import { Test, TestingModule } from '@nestjs/testing';
import { AccountPlayerController } from './account-player.controller';

describe('AccountPlayerController', () => {
  let controller: AccountPlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountPlayerController],
    }).compile();

    controller = module.get<AccountPlayerController>(AccountPlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
