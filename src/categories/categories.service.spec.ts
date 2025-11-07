import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


type MockRepository<T = any> = {
  findOneBy: jest.Mock; 
  find: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  remove: jest.Mock;
};


const createMockRepository = (): MockRepository<Category> => ({
  findOneBy: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});


const mockCategory = {
  id: 1,
  name: 'Elektronik',
  products: [],
} as Category;

const mockCategoryArray = [
  mockCategory,
  { id: 2, name: 'Giyim', products: [] } as Category,
];

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: MockRepository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<MockRepository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createDto: CreateCategoryDto = { name: 'Yeni Kategori' };
      const expectedCategory = { id: 3, ...createDto, products: [] } as Category;

      repository.create.mockReturnValue(createDto);
      repository.save.mockReturnValue(Promise.resolve(expectedCategory));

      expect(await service.create(createDto)).toEqual(expectedCategory);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      repository.find.mockReturnValue(Promise.resolve(mockCategoryArray));
      expect(await service.findAll()).toEqual(mockCategoryArray);
    });
  });

  describe('findOne', () => {
    it('should find one category', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(mockCategory));
      expect(await service.findOne(1)).toEqual(mockCategory);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if category not found', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(null));
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateDto: UpdateCategoryDto = { name: 'Güncel Kategori' };
      const updatedCategory = { ...mockCategory, name: 'Güncel Kategori' };

      repository.findOneBy.mockReturnValue(Promise.resolve(mockCategory));
      repository.save.mockReturnValue(Promise.resolve(updatedCategory));

      expect(await service.update(1, updateDto)).toEqual(updatedCategory);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.save).toHaveBeenCalledWith(updatedCategory);
    });

    it('should throw NotFoundException on update if not found', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(null));
      await expect(service.update(99, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(mockCategory));
      repository.remove.mockReturnValue(Promise.resolve(mockCategory)); 

      expect(await service.remove(1)).toEqual({
        message: `#${1} ID'li kategori başarıyla silindi.`,
      });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.remove).toHaveBeenCalledWith(mockCategory);
    });

    it('should throw NotFoundException on remove if not found', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(null));
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});