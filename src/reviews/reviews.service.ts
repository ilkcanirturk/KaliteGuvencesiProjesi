import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { rating, comment } = createReviewDto;
    
    const newReview = this.reviewsRepository.create({
      rating: rating,
      comment: comment,
      user: { id: createReviewDto.userId },
      product: { id: createReviewDto.productId },
    });

    return this.reviewsRepository.save(newReview);
  }

  findAll() {
    return this.reviewsRepository.find({
      relations: ['user', 'product'],
    });
  }

  async findOne(id: number) {
    const review = await this.reviewsRepository.findOne({
      where: { id: id },
      relations: ['user', 'product'],
    });
    if (!review) {
      throw new NotFoundException(`#${id} ID'li değerlendirme bulunamadı!`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);
    Object.assign(review, updateReviewDto);
    return this.reviewsRepository.save(review);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    await this.reviewsRepository.remove(review);
    return { message: `#${id} ID'li değerlendirme başarıyla silindi.` };
  }
}