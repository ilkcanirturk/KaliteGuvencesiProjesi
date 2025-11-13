import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

const mockCategoriesService = {
  create: jest.fn(dto => ({ id: 1, ...dto })),
  findAll: jest.fn(() => ['category1']),
  findOne: jest.fn(id => ({ id, name: 'Test Category' })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn(id => ({ message: 'deleted' })),
};

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const dto: CreateCategoryDto = { name: 'Test' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all categories', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one category', async () => {
    await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});