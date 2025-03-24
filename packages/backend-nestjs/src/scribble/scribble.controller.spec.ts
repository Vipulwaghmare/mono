import { Test, TestingModule } from '@nestjs/testing';
import { ScribbleController } from './scribble.controller';

describe('ScribbleController', () => {
  let controller: ScribbleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScribbleController],
    }).compile();

    controller = module.get<ScribbleController>(ScribbleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
