import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const mockProductsService = {
  create: jest.fn(dto => ({ id: 1, ...dto })),
  findAll: jest.fn(() => ['product1']),
  findOne: jest.fn(id => ({ id, name: 'Test Product' })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn(id => ({ message: 'deleted' })),
};

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService, // Sahte Service
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});