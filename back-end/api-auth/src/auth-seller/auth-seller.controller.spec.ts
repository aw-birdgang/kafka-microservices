import { Test, TestingModule } from '@nestjs/testing';
import { AuthSellerController } from './auth-seller.controller';

describe('AuthSellerController', () => {
  let controller: AuthSellerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthSellerController],
    }).compile();

    controller = module.get<AuthSellerController>(AuthSellerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
