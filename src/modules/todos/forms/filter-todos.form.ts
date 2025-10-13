import {
  BigIntDecorator,
  StringDecorator,
  DateDecorator,
  NumberDecorator
} from '@/common/decorators';
import { PaginationForm } from '@/common/forms';
import { StringUtil } from '@/utils';
import { Type } from 'class-transformer';
import { Op } from 'sequelize';

export class FilterTodosForm extends PaginationForm {
  @StringDecorator('title')
  title?: string;

  @StringDecorator('description')
  description?: string;

  @Type(() => Date)
  @DateDecorator('dueDateFrom')
  dueDateFrom?: Date;

  @Type(() => Date)
  @DateDecorator('dueDateTo')
  dueDateTo?: Date;

  @Type(() => Number)
  @NumberDecorator('status')
  status?: number;

  getFilter(): Record<string, any> {
    const where: Record<string, any> = {};
    if (!StringUtil.isEmpty(this.title))
      where.title = { [Op.like]: `%${this.title}%` };
    if (!StringUtil.isEmpty(this.description))
      where.description = { [Op.like]: `%${this.description}%` };
    if (this.dueDateFrom && this.dueDateTo) {
      where.dueDate = { [Op.between]: [this.dueDateFrom, this.dueDateTo] };
    } else if (this.dueDateFrom) {
      where.dueDate = { [Op.gte]: this.dueDateFrom };
    } else if (this.dueDateTo) {
      where.dueDate = { [Op.lte]: this.dueDateTo };
    }
    if (this.status) where.status = this.status;
    return where;
  }
}
