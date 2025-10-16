import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotPastDate } from '../validators/is-not-past-date.validator';

export const DueDateDecorator = (name: string, required: boolean = false) => {
  return applyDecorators(
    ApiProperty({
      required,
      type: String,
      format: 'date-time',
      description: `${name} field (must not be in the past)`
    }),
    Type(() => Date),
    IsDate({ message: `${name} must be a valid date` }),
    IsNotPastDate({ message: `${name} cannot be in the past` }),
    ...(required
      ? [IsNotEmpty({ message: `${name} cannot be null or empty` })]
      : [IsOptional()])
  );
};
