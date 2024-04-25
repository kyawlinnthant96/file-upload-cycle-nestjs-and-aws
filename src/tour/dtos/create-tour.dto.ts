import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator';
import { TourDifficultyEnum } from '../types/tour-difficulty.enum';
import { Transform } from 'class-transformer';
import { DiscountPriceValidation } from '../../uitls/discount-price.validation';

export class CreateTourDto {
  @IsNotEmpty()
  title: string;
  //
  // @IsNotEmpty()
  // @IsNumber()
  // duration: number;
  //
  // @IsNotEmpty()
  // @IsNumber()
  // maxGroupSize: number;
  //
  // @IsEnum(TourDifficultyEnum)
  // difficulty: TourDifficultyEnum;
  //
  // @IsNumber()
  // ratingAverage: number;
  //
  // @IsNumber()
  // @IsPositive()
  // @Transform((value) => Number(value)) // Transform incoming data to a number
  // price: number;
  //
  // @IsNumber()
  // @Min(0)
  // @ValidateIf((object, value) => value !== undefined) // Only validate if value is not undefined
  // @Transform((value) => (value !== undefined ? Number(value) : undefined)) // Transform incoming data to a number
  // @Validate(DiscountPriceValidation)
  // priceDiscount?: number;
  //
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // summary: string;
  //
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // description: string;

  @IsOptional()
  @IsString()
  image?: string[];

  @IsOptional()
  @IsString()
  imageCover?: string;

  // @IsOptional()
  // @IsISO8601()
  // startDate?: string[];
  //
  // @IsOptional()
  // @IsBoolean()
  // secretTour: boolean;
}
