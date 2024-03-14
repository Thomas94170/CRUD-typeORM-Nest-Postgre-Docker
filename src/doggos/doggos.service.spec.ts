import { Test, TestingModule } from '@nestjs/testing';
import { DoggosService } from './doggos.service';

describe('DoggosService', () => {
  let service: DoggosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoggosService],
    }).compile();

    service = module.get<DoggosService>(DoggosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
