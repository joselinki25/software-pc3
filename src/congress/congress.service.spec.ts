import { Test, TestingModule } from '@nestjs/testing';
import { CongressService } from './congress.service';

describe('CongressService', () => {
  let service: CongressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CongressService],
    }).compile();

    service = module.get<CongressService>(CongressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
