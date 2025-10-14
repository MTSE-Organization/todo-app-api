import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { AccountModule } from '../account/account.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todos } from '@/models';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [SequelizeModule.forFeature([Todos]), AccountModule]
})
export class TodosModule {}
