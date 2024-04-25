import { IsString, IsUUID, Length } from 'class-validator';

export class FileUploadDto {
  @IsUUID()
  fileId: string;

  @IsString()
  @Length(1, 255)
  fileName: string;

  @IsString()
  path: string;
}
