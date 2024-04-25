import { Module } from '@nestjs/common';
import { TourModule } from './tour/tour.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVars } from './config/types';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { S3Module } from './s3/s3.module';
import { MiscModule } from './misc/misc.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvVars>) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        logging: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),
    TourModule,
    DatabaseModule,
    S3Module,
    MiscModule,
    GalleryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
