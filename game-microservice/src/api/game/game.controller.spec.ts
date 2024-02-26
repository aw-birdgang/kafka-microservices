import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import {GameService} from "./game.service";

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();

    controller = module.get<GameController>(GameController);
    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should find all users', () => {
  //   jest.spyOn(service, 'findAll').mockImplementation(() => [{ id: 1, name: 'John Doe' }]);
  //   expect(controller.findAll()).toEqual([{ id: 1, name: 'John Doe' }]);
  // });

});
