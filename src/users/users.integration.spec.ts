import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Order } from '../orders/entities/order.entity';
import { Review } from '../reviews/entities/review.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';

describe('UsersService (Integration)', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Order, Review, Product, Category],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  beforeEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user in the database', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'Integration User',
        email: 'int@test.com',
      };
      const user = await service.create(createUserDto);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.fullName).toBe('Integration User');

      const dbUser = await repository.findOneBy({ id: user.id });

      expect(dbUser!.email).toBe('int@test.com');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await service.create({ fullName: 'User 1', email: 'user1@test.com' });
      await service.create({ fullName: 'User 2', email: 'user2@test.com' });

      const users = await service.findAll();
      expect(users).toHaveLength(2);
      expect(users[0].fullName).toBe('User 1');
    });

    it('should return an empty array if no users exist', async () => {
      const users = await service.findAll();
      expect(users).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should find one user by id', async () => {
      const user = await service.create({
        fullName: 'Find Me',
        email: 'find@test.com',
      });
      const foundUser = await service.findOne(user.id);

      expect(foundUser).toBeDefined();
      expect(foundUser.id).toBe(user.id);
    });

    it('should throw NotFoundException if user not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user in the database', async () => {
      const user = await service.create({
        fullName: 'Original Name',
        email: 'update@test.com',
      });
      const updateDto: UpdateUserDto = { fullName: 'Updated Name' };

      const updatedUser = await service.update(user.id, updateDto);

      expect(updatedUser.fullName).toBe('Updated Name');
      const dbUser = await repository.findOneBy({ id: user.id });
      expect(dbUser!.fullName).toBe('Updated Name');
    });

    it('should throw NotFoundException on update if not found', async () => {
      await expect(
        service.update(999, { fullName: 'No User' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user from the database', async () => {
      const user = await service.create({
        fullName: 'Delete Me',
        email: 'delete@test.com',
      });

      let dbUser = await repository.findOneBy({ id: user.id });
      expect(dbUser).toBeDefined();

      await service.remove(user.id);

      dbUser = await repository.findOneBy({ id: user.id });
      expect(dbUser).toBeNull();
    });

    it('should throw NotFoundException on remove if not found', async () => {
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
