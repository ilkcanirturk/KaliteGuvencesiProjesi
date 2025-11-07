import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

const mockCategoriesService = {
  create: jest.fn(dto => ({ id: 1, ...dto })),
  findAll: jest.fn(() => ['category1']),
  findOne: jest.fn(id => ({ id, name: 'Test Category' })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn(id => ({ message: 'deleted' })),
};

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService, // Sahte Service
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});