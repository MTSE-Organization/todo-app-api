import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';

@Injectable()
export class TodosService {
  constructor(private readonly accountService: AccountService) {}
}
