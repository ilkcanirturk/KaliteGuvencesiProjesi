import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews') 
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: 'Değerlendirme başarıyla oluşturuldu.' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Tüm değerlendirmeler listelendi.' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Değerlendirme bulundu.' })
  @ApiResponse({ status: 404, description: 'Değerlendirme bulunamadı.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({ status: 200, description: 'Değerlendirme güncellendi.' })
  @ApiResponse({ status: 404, description: 'Değerlendirme bulunamadı.' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Değerlendirme silindi.' })
  @ApiResponse({ status: 404, description: 'Değerlendirme bulunamadı.' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.reviewsService.remove(+id);
  }
}