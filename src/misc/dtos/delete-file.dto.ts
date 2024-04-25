import { IsUUID } from 'class-validator';

export class DeleteFileDto {
  @IsUUID()
  fileId: string;
}
