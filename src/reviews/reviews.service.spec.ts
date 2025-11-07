import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

type MockRepository<T = any> = {
  findOne: jest.Mock;
  find: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  remove: jest.Mock;
};

const createMockRepository = (): MockRepository<Review> => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

const mockReview = {
  id: 1,
  rating: 5,
  comment: 'Harika!',
  userId: 1,
  productId: 1,
  user: { id: 1, fullName: 'Test User' },
  product: { id: 1, name: 'Test Product' },
} as unknown as Review;

describe('ReviewsService', () => {
  let service: ReviewsService;
  let repository: MockRepository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    repository = module.get<MockRepository<Review>>(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const createDto: CreateReviewDto = {
        userId: 1,
        productId: 1,
        rating: 5,
        comment: 'Harika!',
      };
      const createObject = {
        rating: 5,
        comment: 'Harika!',
        user: { id: 1 },
        product: { id: 1 },
      };

      repository.create.mockReturnValue(createObject);
      repository.save.mockReturnValue(Promise.resolve(mockReview));

      expect(await service.create(createDto)).toEqual(mockReview);
      expect(repository.create).toHaveBeenCalledWith(createObject);
      expect(repository.save).toHaveBeenCalledWith(createObject);
    });
  });

  describe('findAll', () => {
    it('should return an array of reviews with relations', async () => {
      repository.find.mockReturnValue(Promise.resolve([mockReview]));
      expect(await service.findAll()).toEqual([mockReview]);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['user', 'product'],
      });
    });
  });

  describe('findOne', () => {
    it('should find one review with relations', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(mockReview));
      expect(await service.findOne(1)).toEqual(mockReview);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['user', 'product'],
      });
    });

    it('should throw NotFoundException if review not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null));
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const updateDto: UpdateReviewDto = { rating: 3, comment: 'İdare eder' };
      const updatedReview = { ...mockReview, ...updateDto };

      repository.findOne.mockReturnValue(Promise.resolve(mockReview));
      repository.save.mockReturnValue(Promise.resolve(updatedReview));

      expect(await service.update(1, updateDto)).toEqual(updatedReview);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['user', 'product'],
      });
      expect(repository.save).toHaveBeenCalledWith(updatedReview);
    });

    it('should throw NotFoundException on update if not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null));
      await expect(service.update(99, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(mockReview));
      repository.remove.mockReturnValue(Promise.resolve(mockReview));

      expect(await service.remove(1)).toEqual({
        message: `#${1} ID'li değerlendirme başarıyla silindi.`,
      });
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['user', 'product'],
      });
      expect(repository.remove).toHaveBeenCalledWith(mockReview);
    });

    it('should throw NotFoundException on remove if not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null));
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
