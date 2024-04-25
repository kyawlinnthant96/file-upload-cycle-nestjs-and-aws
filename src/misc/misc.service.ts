import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from '../config/types';
import { v4 } from 'uuid';
import { ImageUploadQueryDto } from './dtos/image-upload-query.dto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadDto } from './dtos/file-upload.dto';
import { File } from './entities/file.entity';

@Injectable()
export class MiscService {
  constructor(
    private s3Service: S3Service,
    private configService: ConfigService<EnvVars>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async getSignedUrl(imageUploadQueryDto: ImageUploadQueryDto) {
    const nodeEnv = this.configService.get('NODE_ENV');
    const dirPath = nodeEnv === 'production' ? 'prod' : 'dev';
    const s3Path = `${dirPath}/${imageUploadQueryDto.title}/${imageUploadQueryDto.type}`;
    const client = this.s3Service.getClient();
    const objectId = v4();
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: `${s3Path}/${objectId}`,
    });
    const expiresIn = 3600;
    const url = await getSignedUrl(client, command, { expiresIn });

    return { url, objectId, path: s3Path };
  }

  async syncFileName(fileUploadDto: FileUploadDto) {
    return await this.fileRepository.save({
      id: fileUploadDto.fileId,
      name: fileUploadDto.fileName,
      s3path: fileUploadDto.path,
    });
  }

  async deleteFile(fileId: string) {
    const file = await this.fileRepository.findOneBy({ id: fileId });
    if (!file) {
      throw new NotFoundException(`File ${fileId} not found`);
    }
    await this.s3Service.deleteFile(file.id, file.s3path);
    await this.fileRepository.remove(file);
  }
}
