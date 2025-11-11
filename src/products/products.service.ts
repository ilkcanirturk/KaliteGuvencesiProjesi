import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryIds, ...productDetails } = createProductDto;
    const categories = categoryIds.map(id => ({ id: id }));
  
    const newProduct = this.productsRepository.create({
      ...productDetails,
      categories: categories,
    });
  
    const savedProduct = await this.productsRepository.save(newProduct);
    return this.findOne(savedProduct.id);
  }

  findAll() {
    return this.productsRepository.find({ relations: ['categories'] });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id: id }, 
      relations: ['categories']
    });
    if (!product) {
      throw new NotFoundException(`#${id} ID'li ürün bulunamadı!`);
    }
    return product;
  }

  async update(id: number, updateUserDto: UpdateProductDto) {
    const product = await this.findOne(id);

    Object.assign(product, updateUserDto);
    
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return { message: `#${1} ID'li ürün başarıyla silindi.` }; 
  }
}