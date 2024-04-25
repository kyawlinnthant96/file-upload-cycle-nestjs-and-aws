import { Module } from '@nestjs/common';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';
import { S3Module } from '../s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';

@Module({
  imports: [S3Module, TypeOrmModule.forFeature([File])],
  providers: [MiscService],
  controllers: [MiscController],
})
export class MiscModule {}
