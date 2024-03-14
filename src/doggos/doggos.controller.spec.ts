import { Test, TestingModule } from '@nestjs/testing';
import { DoggosController } from './doggos.controller';

describe('DoggosController', () => {
  let controller: DoggosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoggosController],
    }).compile();

    controller = module.get<DoggosController>(DoggosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
