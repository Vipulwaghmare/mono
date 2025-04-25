import { Test, TestingModule } from '@nestjs/testing';
import { MarathiService } from './marathi.service';

describe('MarathiService', () => {
  let service: MarathiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarathiService],
    }).compile();

    service = module.get<MarathiService>(MarathiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
