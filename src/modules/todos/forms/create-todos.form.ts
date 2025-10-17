import { StringDecorator, DateDecorator } from '@/common/decorators';
import { DueDateDecorator } from '@/common/decorators/due-date.decorator';
import { TitleDecorator } from '@/common/decorators/title.decorator';

export class CreateTodosForm {
  @TitleDecorator('title', true)
  title: string;

  @StringDecorator('description', false)
  description?: string;

  @DueDateDecorator('dueDate', true)
  dueDate: Date;
}
