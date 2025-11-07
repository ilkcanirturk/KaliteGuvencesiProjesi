import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

type MockRepository<T = any> = {
  findOne: jest.Mock;
  find: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  remove: jest.Mock;
};

const createMockRepository = (): MockRepository<Order> => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

const mockOrder = {
  id: 1,
  totalAmount: 100,
  userId: 1,
  user: { id: 1, fullName: 'Test User' },
  orderDate: new Date(),
} as unknown as Order;

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: MockRepository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<MockRepository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createDto: CreateOrderDto = { userId: 1, totalAmount: 100 };
      const createObject = {
        totalAmount: 100,
        user: { id: 1 },
      };
      
      repository.create.mockReturnValue(createObject);
      repository.save.mockReturnValue(Promise.resolve(mockOrder));

      expect(await service.create(createDto)).toEqual(mockOrder);
      expect(repository.create).toHaveBeenCalledWith(createObject);
      expect(repository.save).toHaveBeenCalledWith(createObject);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders with relations', async () => {
      repository.find.mockReturnValue(Promise.resolve([mockOrder]));
      expect(await service.findAll()).toEqual([mockOrder]);
      expect(repository.find).toHaveBeenCalledWith({ relations: ['user'] });
    });
  });

  describe('findOne', () => {
    it('should find one order with relations', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(mockOrder));
      expect(await service.findOne(1)).toEqual(mockOrder);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['user'],
      });
    });

    it('should throw NotFoundException if order not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null));
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const updateDto: UpdateOrderDto = { totalAmount: 150 };
      const updatedOrder = { ...mockOrder, totalAmount: 150 };

      repository.findOne.mockReturnValue(Promise.resolve(mockOrder));
      repository.save.mockReturnValue(Promise.resolve(updatedOrder));

      expect(await service.update(1, updateDto)).toEqual(updatedOrder);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['user'] });
      expect(repository.save).toHaveBeenCalledWith(updatedOrder);
    });

    it('should throw NotFoundException on update if not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null));
      await expect(service.update(99, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(mockOrder));
      repository.remove.mockReturnValue(Promise.resolve(mockOrder));

      expect(await service.remove(1)).toEqual({
        message: `#${1} ID'li kullanıcı siparişleri başarıyla silindi.`,
      });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['user'] });
      expect(repository.remove).toHaveBeenCalledWith(mockOrder);
    });

    it('should throw NotFoundException on remove if not found', async () => {
      repository.findOne.mockReturnValue(Promise.resolve(null));
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});