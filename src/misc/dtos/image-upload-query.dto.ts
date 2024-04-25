import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FolderType } from '../types/folder.enum';

export class ImageUploadQueryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(FolderType)
  type: FolderType;
}
