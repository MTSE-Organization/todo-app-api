import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard, AuthorizationGuard } from '../auth/guards';
import {
  ApiListResponse,
  ApiResponse,
  ApiResponseNoData,
  PCode
} from '@/common/decorators';
import { MapperUtil } from '@/utils';
import { CreateTodosForm, FilterTodosForm, UpdateTodosForm } from './forms';
import { TodosDto, TodosAutoCompleteDto } from './dtos';
import { Constant } from '@/constants';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiResponseNoData({ objectName: 'todos', type: 'create' })
  @PCode('TODO_C')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Post('create')
  async create(@Req() req: any, @Body() form: CreateTodosForm) {
    const accountId = req.user.id;
    return this.todosService.create(accountId, form);
  }

  @ApiListResponse(TodosDto, { objectName: 'todos' })
  @Get('list')
  @UseGuards(JwtAuthGuard)
  async list(@Query() form: FilterTodosForm, @Req() req: any) {
    const accountId = req.user.id;
    form.status = Constant.STATUS_ACTIVE;
    const { todos, count } = await this.todosService.findAll(form, accountId);
    return {
      content: MapperUtil.toDtoList(todos, TodosDto),
      totalElements: count,
      totalPages: Math.ceil(count / form.size)
    };
  }

  @ApiResponse(TodosDto, { objectName: 'todos' })
  @Get('get/:id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: bigint, @Req() req: any) {
    const accountId = req.user.id;
    const todo = await this.todosService.findByIdAndAccount(id, accountId);
    return MapperUtil.toDto(todo, TodosDto);
  }

  @ApiResponseNoData({ objectName: 'todos', type: 'update' })
  @PCode('TODO_U')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Put('update')
  async update(@Req() req: any, @Body() form: UpdateTodosForm) {
    const accountId = req.user.id;
    return this.todosService.update(form, accountId);
  }

  @ApiResponseNoData({ objectName: 'todos', type: 'delete' })
  @PCode('TODO_D')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: bigint, @Req() req: any) {
    const accountId = req.user.id;
    return this.todosService.delete(id, accountId);
  }

  @ApiListResponse(TodosAutoCompleteDto, { objectName: 'todos' })
  @UseGuards(JwtAuthGuard)
  @Get('auto-complete')
  async autocomplete(@Query() form: FilterTodosForm, @Req() req: any) {
    const accountId = req.user.id;
    const { todos, count } = await this.todosService.findAll(form, accountId);
    return {
      content: MapperUtil.toDtoList(todos, TodosAutoCompleteDto),
      totalElements: count,
      totalPages: Math.ceil(count / form.size)
    };
  }
}
