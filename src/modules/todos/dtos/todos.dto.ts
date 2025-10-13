import { Expose } from 'class-transformer';

export class TodosDto {
  @Expose()
  id: bigint;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  dueDate: Date;

  @Expose()
  status: number;

  @Expose()
  createdDate: Date;

  @Expose()
  modifiedDate: Date;
}
