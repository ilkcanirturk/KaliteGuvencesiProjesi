import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Mock Tipi
type MockRepository<T = any> = {
  findOne: jest.Mock; // <-- DEĞİŞİKLİK: findOneBy yerine findOne
  find: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  remove: jest.Mock;
};

// Mock Oluşturucu
const createMockRepository = (): MockRepository<Product> => ({
  findOne: jest.fn(), // <-- DEĞİŞİKLİK: findOneBy yerine findOne
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

// Sahte (Mock) Veriler (description: string | null uyumlu)
const mockProduct = {
  id: 1,
  name: 'Test Product 1',
  description: 'Mock description 1',
  price: 100,
  stock: 10,
  categories: [],
  reviews: [],
} as Product;

const mockProductArray = [
  mockProduct,
  {
    id: 2,
    name: 'Test Product 2',
    description: 'Mock description 2',
    price: 200,
    stock: 20,
    categories: [],
    reviews: [],
  } as Product,
];

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: MockRepository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<MockRepository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- create ---
  describe('create', () => {
    it('should create a new product and return it', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        price: 150,
        stock: 5,
        categoryIds: [],
      };
      
      const expectedProduct = {
        id: 3,
        ...createProductDto,
        description: null,
        categories: [],
        reviews: [],
      } as Product;

      repository.create.mockReturnValue(createProductDto);
      repository.save.mockReturnValue(Promise.resolve(expectedProduct));

      const result = await service.create(createProductDto);
      expect(result).toEqual(expectedProduct);
    });
  });

  // --- findAll ---
  describe('findAll', () => {
    it('should return an array of products', async () => {
      repository.find.mockReturnValue(Promise.resolve(mockProductArray));
      const result = await service.findAll();
      expect(result).toEqual(mockProductArray);
    });
  });

  // --- findOne ---
  describe('findOne', () => {
    it('should find a product by id and return it', async () => {
      // <-- DEĞİŞİKLİK: findOneBy yerine findOne'ı mockluyoruz
      repository.findOne.mockReturnValue(Promise.resolve(mockProduct)); 

      const result = await service.findOne(1);
      expect(result).toEqual(mockProduct);
      // <-- DEĞİŞİKLİK: findOne'ın doğru parametrelerle çağrıldığını kontrol et
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['categories'],
      });
    });

    it('should throw NotFoundException if product is not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null)); // <-- DEĞİŞİKLİK
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // --- update ---
  describe('update', () => {
    it('should update a product and return it', async () => {
      const updateProductDto: UpdateProductDto = { name: 'Updated Name' };
      const updatedProduct = { ...mockProduct, name: 'Updated Name' };

      repository.findOne.mockReturnValue(Promise.resolve(mockProduct)); // <-- DEĞİŞİKLİK
      repository.save.mockReturnValue(Promise.resolve(updatedProduct));

      const result = await service.update(1, updateProductDto);
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product to update is not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null)); // <-- DEĞİŞİKLİK
      const updateProductDto: UpdateProductDto = { name: 'Updated Name' };
      await expect(service.update(999, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // --- remove ---
  describe('remove', () => {
    it('should remove a product and return success message', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(mockProduct)); // <-- DEĞİŞİKLİK
      repository.remove.mockReturnValue(Promise.resolve(mockProduct));

      const result = await service.remove(1);
      
      // Kendi 'products.service.ts' dosyanızdaki 'remove' mesajıyla eşleştirin.
      const expectedMessage = (service as any).remove(1).constructor.name === 'Promise' 
        ? (await service.remove(1)).message 
        : (service as any).remove(1).message;
        
      // Testi, servisten gelen gerçek mesaja duyarlı hale getirelim
      // VEYA manuel olarak yazalım:
      expect(result).toEqual({ message: `#${1} ID'li ürün başarıyla silindi.` });
    });

    it('should throw NotFoundException if product to remove is not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null)); // <-- DEĞİŞİKLİK
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});