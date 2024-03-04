import { Test, TestingModule } from '@nestjs/testing';
import { AuthPlayerService } from './auth-player.service';

describe('AuthPlayerService', () => {
  let service: AuthPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthPlayerService],
    }).compile();

    service = module.get<AuthPlayerService>(AuthPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
