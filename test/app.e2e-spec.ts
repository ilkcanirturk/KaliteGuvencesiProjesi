import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request = require('supertest');
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'; 
import { ConfigModule } from '@nestjs/config';


import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { UsersModule } from './../src/users/users.module';
import { ProductsModule } from './../src/products/products.module';
import { CategoriesModule } from './../src/categories/categories.module';
import { OrdersModule } from './../src/orders/orders.module';
import { ReviewsModule } from './../src/reviews/reviews.module';


import { User } from '../src/users/entities/user.entity';
import { Product } from '../src/products/entities/product.entity';
import { Category } from '../src/categories/entities/category.entity';
import { Order } from '../src/orders/entities/order.entity';
import { Review } from '../src/reviews/entities/review.entity';

describe('Sistem Testleri (E2E)', () => {
  let app: INestApplication;
  let dataSource: DataSource; 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Product, Category, Order, Review],
          synchronize: true,
          dropSchema: true,
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule,
        ProductsModule,
        CategoriesModule,
        OrdersModule,
        ReviewsModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  beforeEach(async () => {
    await dataSource.synchronize(true); 
  });

  afterAll(async () => {
    await app.close();
  });



  // Senaryo 1 (Basit)
  it('Senaryo 1 (Basit): GET / (Temel Endpoint)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Senaryo 2 (Karmaşık)
  it('Senaryo 2 (Karmaşık): POST /users -> POST /orders', async () => {
    // 1. ADIM: Kullanıcı oluştur
    const userRes = await request(app.getHttpServer())
      .post('/users')
      .send({ fullName: 'E2E User', email: 'e2e@test.com' })
      .expect(201);
    const userId = userRes.body.id;

    // 2. ADIM: O kullanıcı için sipariş oluştur
    const orderDto = { userId: userId, totalAmount: 999 };
    const orderRes = await request(app.getHttpServer())
      .post('/orders')
      .send(orderDto)
      .expect(201);

    // 3. ADIM: Doğrula
    expect(orderRes.body.user.id).toBe(userId);
  });

  // Senaryo 3 (Karmaşık)
  it('Senaryo 3 (Karmaşık): POST /categories -> POST /products (N-N İlişki)', async () => {
    // 1. ADIM: Kategorileri oluştur
    const cat1 = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Elektronik' })
      .expect(201);
    const cat2 = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Telefon' })
      .expect(201);

    // 2. ADIM: Ürün oluştur ve bağla
    const productDto = {
      name: 'Süper Telefon', price: 500, stock: 20,
      categoryIds: [cat1.body.id, cat2.body.id],
    };
    const productRes = await request(app.getHttpServer())
      .post('/products')
      .send(productDto)
      .expect(201);

    // 3. ADIM: Doğrula (products.service.ts'teki düzeltme sayesinde)
    expect(productRes.body.categories).toHaveLength(2);
    expect(productRes.body.categories[0].name).toBe('Elektronik');
  });

  // Senaryo 4 (Karmaşık)
  it('Senaryo 4 (Karmaşık): POST /users -> POST /products -> POST /reviews', async () => {
    // 1. ADIM: Kullanıcı oluştur
    const userRes = await request(app.getHttpServer())
      .post('/users')
      .send({ fullName: 'Review User', email: 'review@test.com' })
      .expect(201);
    const userId = userRes.body.id;

    // 2. ADIM: Ürün oluştur
    const productRes = await request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Değerlendirilecek Ürün', price: 10, stock: 1, categoryIds: [] })
      .expect(201);
    const productId = productRes.body.id;

    // 3. ADIM: Değerlendirme yap
    const reviewDto = {
      userId: userId, productId: productId, rating: 5, comment: 'Harika ürün!',
    };
    const reviewRes = await request(app.getHttpServer())
      .post('/reviews')
      .send(reviewDto)
      .expect(201);

    // 4. ADIM: Doğrula
    expect(reviewRes.body.user.id).toBe(userId);
    expect(reviewRes.body.product.id).toBe(productId);
  });

  // Senaryo 5 (Hata)
  it('Senaryo 5 (Hata): GET /users/999 (Var olmayan kaynak 404 dönmeli)', () => {
    return request(app.getHttpServer())
      .get('/users/999')
      .expect(404);
  });

  // Senaryo 6 (Hata)
  it('Senaryo 6 (Hata): POST /users (Eksik/Hatalı DTO 400 dönmeli)', () => {
    const badUserDto = { fullName: '' }; // email eksik
    return request(app.getHttpServer())
      .post('/users')
      .send(badUserDto)
      .expect(400);
  });
});