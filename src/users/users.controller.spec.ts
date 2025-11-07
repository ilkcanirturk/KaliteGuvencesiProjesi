import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


const mockUsersService = {
  create: jest.fn(dto => ({ id: 1, ...dto })),
  findAll: jest.fn(() => ['user1']),
  findOne: jest.fn(id => ({ id, name: 'Test User' })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn(id => ({ message: 'deleted' })),
};

describe('UsersController', () => {
  let controller: UsersController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});