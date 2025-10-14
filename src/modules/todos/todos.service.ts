import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, NotFoundException } from '@/common/exceptions';
import { Constant, ErrorCode } from '@/constants';
import { AccountService } from '../account/account.service';
import { Todos } from '@/models';
import { CreateTodosForm, FilterTodosForm, UpdateTodosForm } from './forms';
import { Op } from 'sequelize';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todos)
    private readonly todosRepository: typeof Todos,

    private readonly accountService: AccountService
  ) {}

  async create(accountId: bigint, form: CreateTodosForm) {
    await this.accountService.findById(accountId);

    const todo = await this.todosRepository.create({
      ...form,
      accountId,
      status: Constant.STATUS_ACTIVE
    });

    return { message: 'Create todo successfully' };
  }

  async update(form: UpdateTodosForm, accountId: bigint) {
    const { id, ...data } = form;
    const todo = await this.findByIdAndAccount(id, accountId);

    todo.set(data);
    await todo.save();

    return { message: 'Update todo successfully' };
  }

  async delete(id: bigint, accountId: bigint) {
    const todo = await this.findByIdAndAccount(id, accountId);
    await todo.update({ status: Constant.STATUS_DELETED });
    return { message: 'Delete todo successfully' };
  }

  async findAll(
    query: FilterTodosForm,
    accountId: bigint
  ): Promise<{ todos: Todos[]; count: number }> {
    const { limit, offset } = query.getPagination();
    const where = { ...query.getFilter(), accountId };

    const { rows, count } = await this.todosRepository.findAndCountAll({
      where,
      limit,
      offset,
      order: [
        ['dueDate', 'ASC'],
        ['createdDate', 'DESC']
      ]
    });

    return { todos: rows, count };
  }

  async findById(id: bigint): Promise<Todos> {
    const todo = await this.todosRepository.findByPk(id);
    if (!todo) {
      throw new NotFoundException(
        'Todo not found',
        ErrorCode.TODOS_ERROR_NOT_FOUND
      );
    }
    return todo;
  }

  async findByIdAndAccount(id: bigint, accountId: bigint): Promise<Todos> {
    const todo = await this.todosRepository.findOne({
      where: { id, accountId }
    });
    if (!todo) {
      throw new NotFoundException(
        'Todo not found or not owned by this account',
        ErrorCode.TODOS_ERROR_NOT_FOUND
      );
    }
    return todo;
  }

  async existsByTitleAndAccount(
    title: string,
    accountId: bigint
  ): Promise<boolean> {
    const count = await this.todosRepository.count({
      where: { title, accountId, status: Constant.STATUS_ACTIVE }
    });
    return count > 0;
  }
}
