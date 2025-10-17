import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotPastDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (!(value instanceof Date)) return false;
          const now = new Date();
          return value.getTime() >= now.getTime();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} cannot be in the past`;
        }
      }
    });
  };
}
