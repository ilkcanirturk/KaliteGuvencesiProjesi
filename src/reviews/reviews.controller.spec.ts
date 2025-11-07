import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

const mockReviewsService = {
  create: jest.fn(dto => ({ id: 1, ...dto })),
  findAll: jest.fn(() => ['review1']),
  findOne: jest.fn(id => ({ id, name: 'Test Review' })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn(id => ({ message: 'deleted' })),
};

describe('ReviewsController', () => {
  let controller: ReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService, // Sahte Service
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});