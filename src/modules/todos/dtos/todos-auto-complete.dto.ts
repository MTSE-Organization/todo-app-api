import { Expose } from 'class-transformer';

export class TodosAutoCompleteDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  status: number;

  @Expose()
  dueDate: Date;
}
