import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.ordersRepository.create({
      totalAmount: createOrderDto.totalAmount,
      user: { id: createOrderDto.userId },
    });
    return this.ordersRepository.save(newOrder);
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!order) throw new NotFoundException(`#${id}'ID li sipariş bulunamadı.`);
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    Object.assign(order, updateOrderDto);
    
    return this.ordersRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
    return { message: `#${id} ID'li kullanıcı siparişleri başarıyla silindi.` }; 
  }
}