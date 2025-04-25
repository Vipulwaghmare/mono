import { Test, TestingModule } from '@nestjs/testing';
import { MarathiController } from './marathi.controller';

describe('MarathiController', () => {
  let controller: MarathiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarathiController],
    }).compile();

    controller = module.get<MarathiController>(MarathiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
