import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

const mockUsersService = {
  create: jest.fn((dto) => {
    return {
      id: 1,
      ...dto,
    };
  }),
  findAll: jest.fn(() => {
    return ['user1'];
  }),
  findOne: jest.fn((id) => {
    return {
      id: id,
      fullName: 'Test User',
      email: 'test@mail.com',
    };
  }),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      fullName: 'Test User',
      email: 'test@mail.com',
    };

    const result = await controller.create(dto);

    expect(result).toEqual({
      id: 1,
      ...dto,
    });

    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all users', async () => {
    const result = await controller.findAll();

    expect(result).toEqual(['user1']);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const result = await controller.findOne('1');

    expect(result).toEqual({
      id: 1,
      fullName: 'Test User',
      email: 'test@mail.com',
    });

    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
