import { Test, TestingModule } from '@nestjs/testing';
import { SesmailService } from './sesmail.service';

describe('SesmailService', () => {
  let service: SesmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SesmailService],
    }).compile();

    service = module.get<SesmailService>(SesmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
