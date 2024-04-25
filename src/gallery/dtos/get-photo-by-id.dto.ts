import { IsNotEmpty } from 'class-validator';

export class GetPhotoByIdDto {
  @IsNotEmpty()
  photoId: number;
}
