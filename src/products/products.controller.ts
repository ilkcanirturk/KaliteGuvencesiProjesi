import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiTags, ApiResponse, } from '@nestjs/swagger';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Ürün başarıyla oluşturuldu.'})
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Tüm ürünler listelendi.'})
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ürün bulundu.'})
  @ApiResponse({ status: 404, description: 'Ürün bulunamadı.'})
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Ürün güncellendi.'})
  @ApiResponse({ status: 404, description: 'Ürün bulunamadı.'})
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Ürün silindi.'})
  @ApiResponse({ status: 404, description: 'Ürün bulunamadı.'})
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.remove(+id);
  }
}