import {
  BigIntDecorator,
  StringDecorator,
  DateDecorator,
  NumberDecorator
} from '@/common/decorators';
import { DueDateDecorator } from '@/common/decorators/due-date.decorator';
import { TitleDecorator } from '@/common/decorators/title.decorator';

export class UpdateTodosForm {
  @BigIntDecorator('id', true)
  id: bigint;

  @TitleDecorator('title', false)
  title?: string;

  @StringDecorator('description', false)
  description?: string;

  @DueDateDecorator('dueDate', false)
  dueDate?: Date;

  @NumberDecorator('status', false)
  status?: number;
}
