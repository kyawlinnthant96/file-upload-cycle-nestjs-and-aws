import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Tour } from '../tour/entities/tour.entity';

@ValidatorConstraint({ name: 'isGreaterThanPrice', async: false })
export class DiscountPriceValidation implements ValidatorConstraintInterface {
  validate(
    discountPrice: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const { object } = validationArguments;
    const price = (object as Tour).price;
    return discountPrice <= price;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Discount price must be lower than regular price`;
  }
}
