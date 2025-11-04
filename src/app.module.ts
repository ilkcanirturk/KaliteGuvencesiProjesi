import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        type: 'mssql', 
        host: configService.get<string>('DB_HOST')!, 
        username: configService.get<string>('DB_USER')!, 
        password: configService.get<string>('DB_PASS')!, 
        database: configService.get<string>('DB_NAME')!, 
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, 
        options: {
          encrypt: false, 
          trustServerCertificate: true, 
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}