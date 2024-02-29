import { Test, TestingModule } from '@nestjs/testing';
import { AuthPlayerController } from './auth-player.controller';

describe('AuthPlayerController', () => {
  let controller: AuthPlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthPlayerController],
    }).compile();

    controller = module.get<AuthPlayerController>(AuthPlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
