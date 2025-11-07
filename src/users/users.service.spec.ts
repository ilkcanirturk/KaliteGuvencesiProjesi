import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type MockRepository<T = any> = {
  findOneBy: jest.Mock;
  find: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  remove: jest.Mock;
};

const createMockRepository = (): MockRepository<User> => ({
  findOneBy: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

const mockUser = {
  id: 1,
  fullName: 'Test User 1',
  email: 'test1@mail.com',
  isActive: true,
  orders: [],
  reviews: [],
} as User;

const mockUserArray = [
  mockUser,
  {
    id: 2,
    fullName: 'Test User 2',
    email: 'test2@mail.com',
    isActive: true,
  } as User,
];

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return it', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'New User',
        email: 'new@mail.com',
      };
      const expectedUser = { id: 3, ...createUserDto } as User;

      repository.create.mockReturnValue(createUserDto);
      repository.save.mockReturnValue(Promise.resolve(expectedUser)); 

      const result = await service.create(createUserDto);
      expect(result).toEqual(expectedUser);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      repository.find.mockReturnValue(Promise.resolve(mockUserArray));

      const result = await service.findAll();
      expect(result).toEqual(mockUserArray);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find a user by id and return it', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(mockUser));

      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if user is not found', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(null));

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user and return it', async () => {
      const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };
      const updatedUser = { ...mockUser, fullName: 'Updated Name' };

      
      repository.findOneBy.mockReturnValue(Promise.resolve(mockUser)); 
      repository.save.mockReturnValue(Promise.resolve(updatedUser)); 

      const result = await service.update(1, updateUserDto);
      
      expect(result).toEqual(updatedUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 }); 
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({ fullName: 'Updated Name' }));
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(null)); 

      const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };

      expect(repository.save).not.toHaveBeenCalled();
      await expect(service.update(999, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user and return success message', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(mockUser)); 
      repository.remove.mockReturnValue(Promise.resolve(mockUser));

      const result = await service.remove(1);

      expect(result).toEqual({ message: `#${1} ID'li kullanıcı başarıyla silindi.` });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException if user to remove is not found', async () => {
      repository.findOneBy.mockReturnValue(Promise.resolve(null));

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});