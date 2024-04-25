import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { S3Module } from '../s3/s3.module';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../misc/entities/file.entity';

@Module({
  imports: [S3Module, DatabaseModule, TypeOrmModule.forFeature([File])],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
