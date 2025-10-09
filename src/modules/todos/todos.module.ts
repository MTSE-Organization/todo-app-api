import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [AccountModule]
})
export class TodosModule {}
