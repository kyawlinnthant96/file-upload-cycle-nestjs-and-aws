import { Controller, Get, Param } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get(':id')
  getPhotoById(@Param('id') id: string) {
    return this.galleryService.getPhotoById(id);
  }
}
