import { StringDecorator, DateDecorator } from '@/common/decorators';

export class CreateTodosForm {
  @StringDecorator('title', true)
  title: string;

  @StringDecorator('description', false)
  description?: string;

  @DateDecorator('dueDate', true)
  dueDate: Date;
}
