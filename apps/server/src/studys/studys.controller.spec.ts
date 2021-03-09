import { Test, TestingModule } from '@nestjs/testing';
import { StudysController } from './studys.controller';

describe('StudysController', () => {
  let controller: StudysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudysController],
    }).compile();

    controller = module.get<StudysController>(StudysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
