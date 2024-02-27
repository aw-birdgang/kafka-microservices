import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should find all users', () => {
  //   expect(service.findAll()).toEqual([{ id: 1, name: 'John Doe' }]);
  // });

  it('should find a user by id', () => {
    expect(service.findById(1)).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
