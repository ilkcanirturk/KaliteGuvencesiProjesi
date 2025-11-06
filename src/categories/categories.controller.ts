import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiTags, ApiResponse, } from '@nestjs/swagger';


@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Kategori başarıyla oluşturuldu.'})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Tüm kategoriler listelendi.'})
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Kategori bulundu.'})
  @ApiResponse({ status: 404, description: 'Kategori bulunamadı.'})
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Kategori güncellendi.'})
  @ApiResponse({ status: 404, description: 'Kategori bulunamadı.'})
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Kategori silindi.'})
  @ApiResponse({ status: 404, description: 'Kategori bulunamadı.'})
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}