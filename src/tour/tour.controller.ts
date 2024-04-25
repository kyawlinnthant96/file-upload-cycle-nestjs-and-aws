import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Logger,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dtos/create-tour.dto';
import { Tour } from './entities/tour.entity';

@Controller('tour')
export class TourController {
  private logger = new Logger('TourController');

  constructor(private tourService: TourService) {}

  @Get()
  getTours() {
    return 'Hello';
  }

  @Post()
  createTour(@Body() createTourDto: CreateTourDto): Promise<Tour> {
    return this.tourService.createTour(createTourDto);
  }

  @Patch(':id')
  updateTour() {
    return 'Update tour';
  }

  @Delete(':id')
  deleteTour() {
    return 'Delete Tour';
  }
}
