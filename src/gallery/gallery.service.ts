import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { DatabaseService } from '../database/database.service';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../misc/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryService {
  constructor(
    private s3Service: S3Service,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async getPhotoById(id: string) {
    const file = await this.fileRepository.findOneBy({ id });
    return {
      url: this.s3Service.getFileDownloadUrl(id, file.s3path),
    };
  }
}
