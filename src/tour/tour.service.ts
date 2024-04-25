import { Injectable } from '@nestjs/common';
import { CreateTourDto } from './dtos/create-tour.dto';
import { Tour } from './entities/tour.entity';

@Injectable()
export class TourService {
  async createTour(createTourDto: CreateTourDto) {
    return null;
  }
}
