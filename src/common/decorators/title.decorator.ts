import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export const TitleDecorator = (name: string, required: boolean = false) => {
  return applyDecorators(
    ApiProperty({
      required,
      type: String,
      description: `${name} field (no special characters allowed)`
    }),
    IsString({ message: `${name} must be a string` }),
    Matches(/^[a-zA-Z0-9\s]+$/, {
      message: `${name} must not contain special characters`
    }),
    ...(required
      ? [IsNotEmpty({ message: `${name} cannot be empty` })]
      : [IsOptional()])
  );
};
