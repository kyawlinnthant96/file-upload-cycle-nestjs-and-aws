import {
  DeleteObjectCommand,
  HeadObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from '../config/types';
import { getSignedUrl as getCloudFrontSignUrl } from '@aws-sdk/cloudfront-signer';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  public region: string;
  private readonly cloudfrontDistributionDomain: string;

  constructor(private configService: ConfigService<EnvVars>) {
    const awsRegion = this.configService.get('AWS_DEFAULT_REGION');
    const awsAccessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
    const awsSecretKey = this.configService.get('AWS_SECRET_ACCESS_KEY');

    console.log(awsSecretKey, 'secret key');

    this.s3Client = new S3Client({
      region: awsRegion,
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretKey,
      },
    });
    this.cloudfrontDistributionDomain =
      this.configService.get('AWS_CLOUDFRONT_URL');
  }

  getClient(): S3Client {
    return this.s3Client;
  }

  getFileDownloadUrl(objectId: string, path: string) {
    console.log(objectId, path, 'signed before');
    const nodeEnv = this.configService.get('NODE_ENV');
    const url = `${this.cloudfrontDistributionDomain}/${path}/${objectId}`;
    const privateKey = this.configService.get('AWS_CLOUDFRONT_PRIVATE_KEY');
    const keyPairId = this.configService.get('AWS_CLOUDFRONT_KEY_PAIR_ID');
    const dateLessThan = new Date();
    dateLessThan.setMinutes(dateLessThan.getMinutes() + 20);

    const signedUrl = getCloudFrontSignUrl({
      url,
      keyPairId,
      privateKey,
      dateLessThan: dateLessThan.toString(),
    });
    console.log(signedUrl, 'signed');

    return signedUrl;
  }

  async deleteFile(objectKey: string, path: string) {
    const objectExists = await this.headObjects(objectKey, path);
    if (!objectExists) {
      throw new NotFoundException('Object not found');
    }

    const command = new DeleteObjectCommand({
      Bucket: this.configService.get('AWS_DEFAULT_REGION'),
      Key: `${path}/${objectKey}`,
    });

    await this.s3Client.send(command);
  }

  private async headObjects(objectKey: string, path: string) {
    const command = new HeadObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: `${path}/${objectKey}`,
    });
    try {
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }
}
