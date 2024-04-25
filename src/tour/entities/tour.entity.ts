import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TourDifficultyEnum } from '../types/tour-difficulty.enum';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  maxGroupSize: number;

  @Column('enum', { enum: TourDifficultyEnum })
  difficulty: TourDifficultyEnum;

  @Column({ default: 4.5 })
  ratingAverage: number;

  @Column()
  price: number;

  @Column()
  priceDiscount: number;

  @Column()
  summary: string;

  @Column()
  description: string;

  @Column()
  imageCover: string;

  @Column()
  images: string[];

  @Column({ default: () => Date.now() })
  createAt: Date;

  @Column()
  startDate: Date[];

  @Column({ default: false })
  secretTour: boolean;
}
