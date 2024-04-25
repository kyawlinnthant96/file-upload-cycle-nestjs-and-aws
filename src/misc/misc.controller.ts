import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { MiscService } from './misc.service';
import { ImageUploadQueryDto } from './dtos/image-upload-query.dto';
import { FileUploadDto } from './dtos/file-upload.dto';
import { DeleteFileDto } from './dtos/delete-file.dto';

@Controller('misc')
export class MiscController {
  constructor(private miscService: MiscService) {}

  @Get('file-upload-url')
  getSignedUrl(@Query() imageUploadQueryDto: ImageUploadQueryDto) {
    return this.miscService.getSignedUrl(imageUploadQueryDto);
  }

  @Post('complete-upload')
  @HttpCode(HttpStatus.OK)
  syncFileName(@Body() fileUploadDto: FileUploadDto) {
    return this.miscService.syncFileName(fileUploadDto);
  }

  @Delete('delete-file')
  @HttpCode(HttpStatus.OK)
  deleteFile(@Query() deleteFileDto: DeleteFileDto) {
    return this.miscService.deleteFile(deleteFileDto.fileId);
  }
}
