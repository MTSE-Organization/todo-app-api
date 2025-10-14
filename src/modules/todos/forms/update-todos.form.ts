import {
  BigIntDecorator,
  StringDecorator,
  DateDecorator,
  NumberDecorator
} from '@/common/decorators';

export class UpdateTodosForm {
  @BigIntDecorator('id', true)
  id: bigint;

  @StringDecorator('title', false)
  title?: string;

  @StringDecorator('description', false)
  description?: string;

  @DateDecorator('dueDate', false)
  dueDate?: Date;

  @NumberDecorator('status', false)
  status?: number;
}
